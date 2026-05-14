import subprocess
import os

def deploy():
    local_path = './'
    remote_host = 'ck00181@92.53.96.105'
    remote_path = '/home/c/ck00181/Kursk_region/public_html/'
    
    cmd = [
        'rsync', '-avz', '-e', 'ssh',
        local_path,
        f'{remote_host}:{remote_path}'
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)

if __name__ == '__main__':
    deploy()