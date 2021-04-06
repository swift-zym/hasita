#!/usr/bin/env node
const app = require('commander');
const fs = require('fs')
const color = require('colors-cli');
const { configureOutput } = require('commander');

app.version(require('./package.json').version);

var variables = new Map();
var variables_type = new Map();

/* types start*/
variables_type.set('a','Int');
variables_type.set('b','Int');
variables_type.set('c','Int');
variables_type.set('d','Int');
variables_type.set('e','Int');
variables_type.set('f','Int');
variables_type.set('g','Int');
variables_type.set('h','Int');
variables_type.set('i','Int');
variables_type.set('j','Int');
variables_type.set('k','Int');
variables_type.set('l','Int');
variables_type.set('m','Int');
variables_type.set('n','Int');
variables_type.set('o','Int');
variables_type.set('p','Int');
variables_type.set('q','Int');
variables_type.set('r','Int');
variables_type.set('s','Int');
variables_type.set('t','Int');
variables_type.set('u','Int');
variables_type.set('v','Int');
variables_type.set('w','Int');
variables_type.set('x','Int');
variables_type.set('y','Int');
variables_type.set('z','Int');
variables_type.set('1ds1','Array[Int]');
variables_type.set('1ds2','Array[Int]');
variables_type.set('1ds3','Array[Int]');
variables_type.set('2ds1','Array[Int][Int]');
variables_type.set('str','String');
variables_type.set('boolnum','Boolean');
/*types end*/

/*value start*/
variables.set('a',0);
variables.set('b',0);
variables.set('c',0);
variables.set('d',0);
variables.set('e',0);
variables.set('f',0);
variables.set('g',0);
variables.set('h',0);
variables.set('i',0);
variables.set('j',0);
variables.set('k',0);
variables.set('l',0);
variables.set('m',0);
variables.set('n',0);
variables.set('o',0);
variables.set('p',0);
variables.set('q',0);
variables.set('r',0);
variables.set('s',0);
variables.set('t',0);
variables.set('u',0);
variables.set('v',0);
variables.set('w',0);
variables.set('x',0);
variables.set('y',0);
variables.set('z',0);
/*values end*/

app.command('run <file>')
    .description('运行 hasita 文件')
    .alias('r')
    .action(async function(file){
        if(!file.toString().startsWith('/') && !file.toString().startsWith('.')){
            file='./'+file;
        }
        if(!fs.existsSync(file)){
            console.log(color.red('Error:'),'file not exits');
            return;
        }
        const code = fs.readFileSync(file)
        const lens = code.toString().split('\n')
        lens.forEach((len)=>{
            const current = len.split(' ');
            if(current[0]=='START'||current[0]=='END'){
                
            }
            else if(current[0]=='CN'){
                if(current[3]=='1'){
                    variables.set(current[1],variables.get(current[1])+parseInt(current[2]));
                }
                else if(current[3]=='2'){
                    variables.set(current[1],variables.get(current[1])-parseInt(current[2]));
                }
                else if(current[3]=='3'){
                    variables.set(current[1],variables.get(current[1])*parseInt(current[2]));
                }
                else if(current[3]=='4'){
                    variables.set(current[1],variables.get(current[1])/parseInt(current[2]));
                }
                else if(current[3]=='5'){
                    variables.set(current[1],variables.get(current[1])%parseInt(current[2]));
                }
            }
            else if(current[0]=='LET'){
                variables.set(current[1],parseInt(current[2]));
            }
            else if(current[0]=='COPY'){
                variables.set(current[3],variables.get(current[1]));
            }
            else if(current[0]=='CV'){
                if(current[3]=='1'){
                    variables.set(current[4],variables.get(current[1])+variables.get(current[2]));
                }
                else if(current[3]=='2'){
                    variables.set(current[4],variables.get(current[1])-variables.get(current[2]));
                }
                else if(current[3]=='3'){
                    variables.set(current[4],variables.get(current[1])*variables.get(current[2]));
                }
                else if(current[3]=='4'){
                    variables.set(current[4],variables.get(current[1])/variables.get(current[2]));
                }
                else if(current[3]=='5'){
                    variables.set(current[4],variables.get(current[1])%variables.get(current[2]));
                }
            }
            else if(current[0]=='SYSTEM'){
                if(current[1]=="FLUSH"){
                    console.log(color.blue(variables.get(current[2])));
                }
            }
        });
    });

app.parse(process.argv);