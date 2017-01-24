// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Come together', duration: '1:01' },
         { title: 'Octopuses Garden', duration: '5:01' },
         { title: 'Something', duration: '3:21'},
         { title: 'Sun King', duration: '3:14' },
         { title: 'The End', duration: '2:15'}
     ]
 };

 // Beatles Album
 var albumBeatles = {
     title: 'Abby Road',
     artist: 'The Beatles',
     label: 'EM',
     year: '1964',
     albumArtUrl: 'assets/images/album_covers/abbeyroad.jpeg',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return $(template);
 };

 var setCurrentAlbum = function(album) {
     // #1
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     
     // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // #3
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
        
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
         
     }
 };


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');


// Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;

 
 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     var getSongItem = function(element){
         
         switch (element.className) {
                case 'album-song-button':
                case 'ion-play':
                case 'ion-pause':
                    return findParentByClassName(element, 'song-item-number');
                case 'album-view-song-item':
                    return element.querySelector('.song-item-number');
                case 'song-item-title':
                case 'song-item-duration':
                    return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
                case 'song-item-number':
                    return element;
                default:
                    return;
         }
     }

 var findParentByClassName = function(element, targetClass){
       //Shows a different alert when it fails to find a parent with the given class name: "No parent found with that class name".
        if (element) {
            if(!element.parentElement) {
                alert('No parent found');
            }else{
                var currentParent = element.parentElement;
                var find = 0;
                while (currentParent.className != targetClass && currentParent.className !== null) {
                    currentParent = currentParent.parentElement;
                    find = 1;
                }
                if(currentParent === element.parentElement) {alert("No parent found with that class name") }
                return currentParent;
            }
        }
     }
 var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement); 
    
    if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }

 };

     
     var cover = document.getElementsByClassName('album-cover-art')[0];
     cover.addEventListener('click', function() {
         
         var album= document.getElementsByClassName('album-view-title')[0].textContent;
         if(album == 'The Colors'){
             setCurrentAlbum(albumMarconi);
         }else if (album == 'The Telephone'){
             setCurrentAlbum(albumBeatles);
         }
         else{
             setCurrentAlbum(albumPicasso);
         }
         
     });
     
     songListContainer.addEventListener('mouseover', function(event) {
        
         // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             
             var songItem = getSongItem(event.target);

             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
             }
             
         }
     });
     
     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
          
         songRows[i].addEventListener('click', function(event) {
             clickHandler(event.target);
         });
     }
    }