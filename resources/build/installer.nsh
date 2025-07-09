!macro customInit
    ; 安装前置检查
    nsExec::ExecToStack 'cmd /c tasklist /FI "IMAGENAME eq app.exe"|findstr /C:"app.exe"'
    Pop $0  ; 返回码
    Pop $1  ; 输出内容
    ; MessageBox MB_OK "findstr 返回码: $0\n输出内容: $1"
    
    ; findstr 返回码：0=找到匹配，1=未找到匹配
    StrCmp $0 "0" ProcessFound ProcessNotFound
    
    ProcessFound:
        MessageBox MB_OKCANCEL|MB_ICONQUESTION "检测到软件正在运行，需要关闭后才能继续安装。$\n$\n点击确定关闭程序并继续安装，点击取消退出安装。" IDOK DoKill IDCANCEL DoCancel
        
        DoKill:
            ; 强制结束所有相关进程
            nsExec::ExecToStack 'taskkill /F /IM "app.exe" /T'
            Pop $0
            Sleep 2000  ; 等待进程结束
            Goto Done
            
        DoCancel:
            Quit
            
    ProcessNotFound:
        ; 进程未运行，继续安装
        
    Done:
!macroend