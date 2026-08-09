fx_version 'cerulean'
game 'gta5'

author 'Pablo Scripts'
description 'Interactive FiveM loading screen'
version '1.0.0'

loadscreen 'html/index.html'
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

client_script 'client.lua'

files {
    'html/index.html',
    'html/css/*.css',
    'html/js/*.js',
    'html/assets/*',
    'html/assets/backgrounds/*',
    'html/assets/fonts/*',
    'html/assets/music/*',
    'html/assets/team/*'
}
