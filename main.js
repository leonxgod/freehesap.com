//!İMPORT PACKAGE
const express = require('express');
const mysql = require('mysql2');
const chalk = require('chalk');

class freeHesap {

    static app;
    static port;
    static db;

    constructor() 
    {

        this.app = express();
        this.port = 5000;
        this.db = mysql.createConnection({
            host: 'host',
            user: 'username',
            password: 'password',
            database: 'database'
        });
        this.__init__();

    }
    __init__ = () => 
    {
        this.db.connect(err => {
            err ? console.log(chalk.redBright(err)) : console.log(chalk.cyanBright('Mysql bağlantısı başarılı.'));
        })
        this.app.set('view engine', 'ejs');
        this.app.use(express.static(__dirname + '/assets/'));
        this.__routes__();
        this.portListen();

    }

    __routes__ = () => 
    {

        this.app.get('/', (req, res) => 
        {
            this.db.query("SELECT * FROM freehesap ORDER BY id DESC LIMIT 5", (err, resolve) => 
            {
                err ? console.log(chalk.redBright(err)) : res.render('index', {data: resolve, time_ago: this.timeAgo});
            })
        })

        this.app.get('/account/:url', (req, res, next) => 
        {

          this.db.query("SELECT * FROM freehesap WHERE url = '"+ req.params.url +"'", (err, resolve) => 
            {
              if(err)  console.log(chalk.redBright(err));
              if(resolve.length == 0 || resolve[0]['status'] == 'ok') {
                return res.sendStatus(404);
              }
              res.send(resolve[0]['mail'] + ':' + resolve[0]['pass']);
              this.db.query("UPDATE freehesap SET status = 'ok' WHERE url = '"+ req.params.url +"'")
              this.db.query("UPDATE freehesap SET time_ago='"+ new Date().getTime() +"' WHERE url = '"+ req.params.url +"'")
            })

        })

        this.app.post('/account/', (req, res) => 
        {

          this.db.query("SELECT * FROM freehesap WHERE status='no'", (err, resolve) => 
            {
              if(err)  console.log(chalk.redBright(err));
              
              resolve.length == 0 ? res.status(400).send('Veritabanın da hiç hesap kalmamış') :  res.redirect(resolve[0]['url'])
            })

        })

        this.app.get('/contact', (req, res) => 
        {
          res.render('iletisim');

        })

        this.app.get('*', (req, res) => 
        {
          res.sendStatus(404);
        })
    }

    portListen = () => 
    {
        console.log(chalk.yellowBright(this.port + '. port dinlenmeye başlandı'));
        this.app.listen(this.port);

    }

    timeAgo = (timeStamp) => 
    {
      var now = new Date(),
        secondsPast = (now.getTime() - timeStamp) / 1000;
      if (secondsPast < 60) {
        return parseInt(secondsPast) + ' saniye önce';
      }
      if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + ' dakika önce';
      }
      if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + ' saat önce';
      }
      if (secondsPast > 86400) {
        return '1 günden fazla';
      }
    }

}

const sleep = async (ms) => 
{

  return new Promise(resolve => 
    {
      setTimeout(resolve, ms)
    })

};

(async() => {

  let textLines = [
    " /$$",                                    
    "| $$",                                   
    "| $$        /$$$$$$   /$$$$$$  /$$$$$$$", 
    "| $$       /$$__  $$ /$$__  $$| $$__  $$",
    "| $$      | $$$$$$$$| $$  \  $$| $$  \  $$",
    "| $$      | $$_____/| $$  | $$| $$  | $$",
    "| $$$$$$$$|  $$$$$$$|  $$$$$$/| $$  | $$",
    "|________/ \_______/ \______/ |__/  |__/",
    ""]
    for(arrayIndex = 0; arrayIndex< textLines.length; arrayIndex++) {
        process.stdout.write('\033c');
        textLines.forEach((line, index) => {
            if(index <= arrayIndex) {
                console.log(chalk.greenBright(line));
            } else {
                console.log(line);
            }
        });
        await sleep(100);
  }
  new freeHesap();

})();
