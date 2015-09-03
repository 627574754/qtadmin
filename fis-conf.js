//fis.config.set('modules.postpackager', 'simple');

//对零散资源进行合并，保证一个文件里只有一个script标签
//fis.config.set('settings.postpackager.simple.autoCombine', true);

//对加上了?__sprite参数的图片进行合并
//fis.config.set('modules.spriter', 'csssprites');
//fis.config.set('settings.spriter.csssprites.margin', 5);

//强制合并后的script标签出现在文件里而不是一定要有body标签才出现
//fis.config.set('settings.postpackager.simple.forceOutput', true);

/*
npm install -g fis --registry=http://r.cnpmjs.org
fis release -w --domains --dest normal*/

fis.config.merge({
    modules : {
        parser : {
            //less : ['less']
        }
    },
    project : {
        exclude : /^.*\/[_.].*\//i //任何以_和.开头的文件或文件夹都不会被处理
    },
    roadmap : {
        domain : '.',
        path : [
            {
                reg:"**/fontello/*",
                useCompile: false
            },
            {
                //css不要用domain
                reg : /^(.*\/.+\.(?:css|js|less))$/i,
                useCompile: false
            }

        ]
    },
    deploy : {
        normal: {
            to: '_output'
        },
        remotestatic : {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : 'http://localhost/receiver.php',
            //从当前模块找文件
            from : '/static/',
            //保存到远端机器的/www目录下
            //这个参数会跟随post请求一起发送
            to : 'www/'

        },
        remotetpl : {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : 'http://localhost/receiver.php',
            //从当前模块找文件
            from : '/template',
            //保存到远端机器的/www目录下
            //这个参数会跟随post请求一起发送
            to : 'www/'

        },
        //名字随便取的，没有特殊含义
        static : {
            //from参数省略，表示从发布后的根目录开始上传
            //from : '/static',
            //发布到当前项目的上一级的output目录中
            exclude : /(\/templates\/|\/static\/|^\/[^\/]+\.php)/i,
            to : '/data/www/smartdata/www/www/static'
        },
        staticonline : {
            //from参数省略，表示从发布后的根目录开始上传
            //from : '/static',
            //发布到当前项目的上一级的output目录中
            exclude : /(\/templates\/|\/static\/|^\/[^\/]+\.php)/i,
            to : '/data/deployment/deploydir/smartdata/smartdata/www/www/static'
        },
        //名字随便取的，没有特殊含义
        tpl : {
            //from参数省略，表示从发布后的根目录开始上传
            from : '/templates/',
            //发布到当前项目的上一级的output目录中
            to : '/data/www/smartdata/www/app/smarty/'
        },

        tplonline : {
            //from参数省略，表示从发布后的根目录开始上传
            from : '/templates/',
            //发布到当前项目的上一级的output目录中
            to : '/data/deployment/deploydir/smartdata/smartdata/www/app/smarty/'
        },
        //名字随便取的，没有特殊含义
        localstatic : {
            //from参数省略，表示从发布后的根目录开始上传
            //from : '/static',
            //发布到当前项目的上一级的output目录中
            exclude : /(\/templates\/|\/static\/|^\/[^\/]+\.php)/i,
            to : '_output'
        },
        //名字随便取的，没有特殊含义
        localtpl : {
            //from参数省略，表示从发布后的根目录开始上传
            from : '/templates/',
            //发布到当前项目的上一级的output目录中
            to : '_output'
        }

    }
});