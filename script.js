
(function() {

  var $output;
  var _inited = false;
  var _locked = true;
  var _buffer = [];
  var _obuffer = [];
  var _ibuffer = [];
  var _cwd = "/";
  var _prompt = function() { return  "abdellaoui@M3d : ~" + _cwd + " # "; };
  var _history = [];
  var _hindex = -1;
  var _lhindex = -1;

  var _filetree = {
    'documents': {type: 'dir', files: {
      'description': {type: 'file', mime: 'text/plain', content: "Attention all hackers, brace yourself because this 21-year-old cyber security superhero is \nready to save the internet from your evil ways! I'm studying at the National School of \nApplied Sciences of Marrakech, where I'm learning how to use my superpowers to defend\nthe digital world from malicious attacks. My skills are sharp, my knowledge is vast, and I've\ngot more energy than a hyperactive toddler on a sugar high. I'm like Batman, but instead of\nfighting crime on the streets, I'm fighting crime in cyberspace. So, hackers beware, I'm \ncoming for you and I've got a laptop loaded with weapons of mass protection! Buckle up, \nit's gonna be a wild ride!"},
      'skills': {type: 'file', mime: 'text/plain', content: "\nFundamentals         : ||||||||||||||||||||  100%\n\nlinux                : |||||||||||||||||     85%\n\nWeb Exploitation     : ||||||||||||||||      81%\n\nWindows Exploitation : ||||||||||||          57%\n\nNetwork Exploitation : ||||||||||||||||||    87%\n\nPrivilege Escalation : ||||||||||||          60%\n\nBased on TryHackMe skill matrix.\n"},
      'cv': {type: 'file', mime: 'text/plain', content: "here's the link to my cv: 'shorturl.at/jMZ89' \nOr you type the following command : show cv"},
      'flag.txt': {type: 'file', mime: 'text/plain', content: "\nCyberSecurityWeek: \n\t + congrats!! you made it. Here is your flag : CRISIS{T1M3_TR4V3L}"},
      'copyrights': {type: 'file', mime: 'text/plain', content: "All rights reserved"}
    }},
  };

 
  var _commands = {

    history: function() {
      return _history.join("\n");
    },

    whoami: function() {
      var out = [];
            out = [
              "\nAttention all hackers, brace yourself because this 21-year-old cyber security superhero is ",
              "ready to save the internet from your evil ways! I'm studying at the National School of ",
              "Applied Sciences of Marrakech, where I'm learning how to use my superpowers to defend",
              "the digital world from malicious attacks. My skills are sharp, my knowledge is vast, and I've",
              "got more energy than a hyperactive toddler on a sugar high. I'm like Batman, but instead of",
              "fighting crime on the streets, I'm fighting crime in cyberspace. So, hackers beware, I'm ",
              "coming for you and I've got a laptop loaded with weapons of mass protection! Buckle up, ",
              "it's gonna be a wild ride!\n"
              
            ];

      return out.join("\n");
    },

    ls: function(dir) {
      dir = parsepath((dir || _cwd));

      var out = [];
      var iter = getiter(dir);

      var p;
      var tree = (iter && iter.type == 'dir') ? iter.files : _filetree;
      var count = 0;
      var total = 0;

      for ( var i in tree ) {
        if ( tree.hasOwnProperty(i) ) {
          p = tree[i];
          if ( p.type == 'dir' ) {
            out.push(format('{0} {1} {2}', padRight('<'+i+'>', 20), padRight(p.type, 20), '0'));
          } else {
            out.push(format('{0} {1} {2}', padRight(i, 20), padRight(p.mime, 20), p.content.length));
            total += p.content.length;
          }
          count++;
        }
      }

      out.push(format("\n{0} file(s) in total, {1} byte(s)", count, total));

      return out.join("\n");
    },

    cd: function(dir) {
      if ( !dir ) {
        return (["You need to supply argument: dir"]).join("\n");
      }

      var dirname = parsepath(dir);
      var iter = getiter(dirname);
      if ( dirname == '/' || (iter && iter.type == 'dir')) {
        _cwd = dirname;
        return (['Entered: ' + dirname]).join("\n");
      }

      return (["Path not found: " + dirname]).join("\n");
    },

    cat: function(file) {
      if ( !file ) {
        return (["You need to supply argument: filename"]).join("\n");
      }

      var filename = parsepath(file);
      var iter = getiter(filename);
      if ( !iter ) {
        return (["File not found: " + filename]).join("\n");
      }

      return iter.content;
    },

    pwd: function() {
      return (['Current directory: ' + _cwd]).join("\n");
    },

    clear: function() {
      return false;
    },
	
	cls: function() {
      return false;
    },

    ContactMeOn: function(key) {
      if ( !key ) {
        return (["You need to supply argument: Contact Medium"]).join("\n");
      }
      key = key || '';
      var out = [];

      switch ( key.toLowerCase() ) {
        case 'email' :
          window.open('mailto:m3d.abdellaoui@gmail.com');
          break;
        case 'github' :
          window.open('https://github.com/M3Dabdellaoui/');
          break;
        case 'linkedin' :
          window.open('https://www.linkedin.com/in/mohamed-abdellaoui/');
          break;
        case 'instagram' :
          window.open('https://instagram.com/abdellaouiii_m3d');
          break;
        case 'twitter' :
          window.open('https://twitter.com/#!/Abdellaoui_M3D');
          break;
        case 'tryhackme' :
          window.open('https://tryhackme.com/p/abdellaoui.m3d');
          break;
		case 'hackTheBox' :
          window.open('M3DD');
          break;

        default :
          if ( key.length ) {
            out = ['Invalid key: ' + key];
          
      }

      return out.join("\n");
    }
    }, 

    contact: function(key) {
     
            out = [
              "Contact information:\n",
              'Name            Abdellaoui Mohamed',
              'Email           m3d.abdellaoui@gmail.com',
              'Github          https://github.com/M3Dabdellaoui/',
              'TryHackMe       https://tryhackme.com/p/abdellaoui.m3d',
              'HackTheBox      M3DD',

              'usage :        ContactMeOn <Contact medium>  (example: `ContactMeOn github`)\n'
            ];
            return out.join("\n");
    },
    show: function(key) {
            if ( !key ) {
              return (["You need to supply argument! -_- "]).join("\n");
            }else{
                if ( key!="cv" ) {
                  return (["Document Not found! -_- "]).join("\n");
                }else{
                  window.open('Docs/cv_eng.pdf');
                }
            }
    },

    sudo: function(key) {
            if ( !key ) {
              return (["You need to supply argument! -_- "]).join("\n");
            }else{
                if ( key!="-l" ) {
                  return (["Invalid option"]).join("\n");
                }else{
                  return (["\nhaha nice try ! -_-"]).join("\n");                }
            }
    },

    socials: function(key) {
      
            out = [
              "\nMy socials:\n",
              'LinkedIn       http://www.linkedin.com/in/mohamed-abdellaoui/',
              'Instagram      http://instagram.com/abdellaouiii_m3d',
              '               http://instagram.com/drvw_m3',
              'Twitter        https://twitter.com/#!/Abdellaoui_M3D',
              'facebook       https://facebook.com/mohamed_abdellaoui\n',
              'usage :        goto <social name>  (example: `goto instagram`)\n'

            ];
            return out.join("\n");
    },

    goto: function(key) {
      if ( !key ) {
        return (["You need to supply argument: social media name"]).join("\n");
      }
      key = key || '';
      var out = [];

      switch ( key.toLowerCase() ) {
        case 'linkedin' :
          window.open('https://www.linkedin.com/in/mohamed-abdellaoui-067b891a5/');
          break;
        case 'instagram' :
          window.open('https://instagram.com/abdellaouiii_m3d');
          break;
        case 'twitter' :
          window.open('https://twitter.com/#!/Abdellaoui_M3D');
          break;
        default :
          if ( key.length ) {
            out = ['Invalid key: ' + key];
          
      }

      return out.join("\n");
    }
    },

    help: function() {
      var out = [
        'help                                   This command',
        'whoami                                 gives a little description about me',
        'ls                                     List current (or given) directory contents',
        'cd <dir>                               Enter directory',
        'cat <filename>                         Show file contents',
        '_history                               displays the commands history',
        'contact                                How to contact me',
        'ContactMeOn <contact medium>           Open page (example: `ContactmeOn email`)',
        'socials                                My social-mediaS',
        'goto <social name>                     Open page (example: `goto instagram`)',
        'clear/cls                              Clears the screen',
        'pwd                                    shows the current directory` ',
        'show <document>                        open page with my CV \n\n',
        //'Projects                               open page with my CV\n\n',
        'Up arrow   => previous command',
        'Ctrl+l     => clear'
      ];

      return out.join("\n");
    }

  };

 //---------------------------------------------outils---------------------------------------------------------------

  function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }

  function format(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    var sprintfRegex = /\{(\d+)\}/g;

    var sprintf = function (match, number) {
      return number in args ? args[number] : match;
    };

    return format.replace(sprintfRegex, sprintf);
  }


  function padRight(str, l, c) {
    return str+Array(l-str.length+1).join(c||" ")
  }

  function padCenter(str, width, padding) {
    var _repeat = function(s, num) {
      for( var i = 0, buf = ""; i < num; i++ ) buf += s;
      return buf;
    };

    padding = (padding || ' ').substr( 0, 1 );
    if ( str.length < width ) {
      var len     = width - str.length;
      var remain  = ( len % 2 == 0 ) ? "" : padding;
      var pads    = _repeat(padding, parseInt(len / 2));
      return pads + str + pads + remain;
    }

    return str;
  }

  function parsepath(p) {
    var dir = (p.match(/^\//) ? p : (_cwd  + '/' + p)).replace(/\/+/g, '/');
    return realpath(dir) || '/';
  }

  function getiter(path) {
    var parts = (path.replace(/^\//, '') || '/').split("/");
    var iter = null;

    var last = _filetree;
    while ( parts.length ) {
      var i = parts.shift();
      if ( !last[i] ) break;

      if ( !parts.length ) {
        iter = last[i];
      } else {
        last = last[i].type == 'dir' ? last[i].files : {};
      }
    }

    return iter;
  }

  function realpath(path) {
    var parts = path.split(/\//);
    var path = [];
    for ( var i in parts ) {
      if ( parts.hasOwnProperty(i) ) {
        if ( parts[i] == '.' ) {
          continue;
        }

        if ( parts[i] == '..' ) {
          if ( path.length ) {
            path.pop();
          }
        } else {
          path.push(parts[i]);
        }
      }
    }

    return path.join('/');
  }

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  /////////////////////////////////////////////////////////////////
  // SHELL
  /////////////////////////////////////////////////////////////////

  (function animloop(){
    requestAnimFrame(animloop);

    if ( _obuffer.length ) {
      $output.value += _obuffer.shift();
      _locked = true;

      update();
    } else {
      if ( _ibuffer.length ) {
        $output.value += _ibuffer.shift();

        update();
      }

      _locked = false;
      _inited = true;
    }
  })();

  function print(input, lp) {
    update();
    _obuffer = _obuffer.concat(lp ? [input] : input.split(''));
  }

  function update() {
    $output.focus();
    var l = $output.value.length;
    setSelectionRange($output, l, l);
    $output.scrollTop = $output.scrollHeight;
  }

  function clear() {
    $output.value = '';
    _ibuffer = [];
    _obuffer = [];
    print("");
  }

  function command(cmd) {
    print("\n");
    if ( cmd.length ) {
      var a = cmd.split(' ');
      var c = a.shift();
      if ( c in _commands ) {
        var result = _commands[c].apply(_commands, a);
        if ( result === false ) {
          clear();
        } else {
          print(result || "\n", true);
        }
      } else {
        print("Unknown command: " + c);
      }

      _history.push(cmd);
    }
    print("\n\n" + _prompt());

    _hindex = -1;
  }

  function nextHistory() {
    if ( !_history.length ) return;

    var insert;
    if ( _hindex == -1 ) {
      _hindex  = _history.length - 1;
      _lhindex = -1;
      insert   = _history[_hindex];
    } else {
      if ( _hindex > 1 ) {
        _lhindex = _hindex;
        _hindex--;
        insert = _history[_hindex];
      }
    }

    if ( insert ) {
      if ( _lhindex != -1 ) {
        var txt = _history[_lhindex];
        $output.value = $output.value.substr(0, $output.value.length - txt.length);
        update();
      }
      _buffer = insert.split('');
      _ibuffer = insert.split('');
    }
  }


  window.onload = function() {
    $output = document.getElementById("output");
    $output.contentEditable = true;
    $output.spellcheck = false;
    $output.value = '';

    $output.onkeydown = function(ev) {
      var k = ev.which || ev.keyCode;
      var cancel = false;

      if ( !_inited ) {
        cancel = true;
      } else {
        if ( k == 9 ) {
          cancel = true;
        } else if ( k == 38 ) {
          nextHistory();
          cancel = true;
        } else if ( k == 40 ) {
          cancel = true;
        } else if ( k == 37 || k == 39 ) {
          cancel = true;
        }
      }

      if ( cancel ) {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }

      if ( k == 8 ) {
        if ( _buffer.length ) {
          _buffer.pop();
        } else {
          ev.preventDefault();
          return false;
        }
      }

      return true;
    };

    $output.onkeypress = function(ev) {
      ev.preventDefault();
      if ( !_inited ) {
        return false;
      }

      var k = ev.which || ev.keyCode;
      if ( k == 13 ) {
        var cmd = _buffer.join('').replace(/\s+/, ' ');
        _buffer = [];
        command(cmd);
      } else {
        if ( !_locked ) {
          var kc = String.fromCharCode(k);
          _buffer.push(kc);
          _ibuffer.push(kc);
        }
      }

      return true;
    };

    $output.onfocus = function() {
      update();
    };

    $output.onblur = function() {
      update();
    };

    window.onfocus = function() {
      update();
    };

    //clear shortcut
    document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'l') {
      clear();
      event.preventDefault();
    }
    });

    //print("------------------------------------------------------------------------------------------------------------------");
    print("            _         _      _ _                   _   __  __       _                              _ \n", true);
    print("      /\\   | |       | |    | | |                 (_) |  \\/  |     | |                            | |\n", true);
    print("     /  \\  | |__   __| | ___| | | __ _  ___  _   _ _  | \\  / | ___ | |__   __ _ _ __ ___   ___  __| |\n", true);
    print("    / /\\ \\ | '_ \\\ / _` |/ _ \\ | |/ _` |/ _ \\| | | | | | |\\/| |/ _ \\| '_ \\ / _` | '_ ` _ \\ / _ \\/ _` |\n", true);
    print("   / ____ \\| |_) | (_| |  __/ | | (_| | (_) | |_| | | | |  | | (_) | | | | (_| | | | | | |  __/ (_| |\n", true);
    print("  /_/    \\_\\_.__/ \\__,_|\\___|_|_|\\__,_|\\___/ \\__,_|_| |_|  |_|\\___/|_| |_|\\__,_|_| |_| |_|\\___|\\__,_|\n", true);
    print("\n\n\n", true);
    print("                                 Welcome to my interactive web terminal.\n", true);
    print("                               For a list of available commands, type 'help'.\n\n", true);
    print("                                       press <Enter> to start.\n\n", true);

    print("\n", true);
    print("\n\n");

  };

})();



