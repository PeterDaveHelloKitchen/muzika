blueprints = custom_target('blueprints',
  input: files(
    'components/carousel/card.blp',
    'components/carousel/carousel.blp',
    'components/carousel/flatcard.blp',
    'components/carousel/moodbox.blp',
    'components/dynamic-action.blp',
    'components/dynamic-image.blp',
    'components/library/history.blp',
    'components/library/songs.blp',
    'components/library/view.blp',
    'components/loading.blp',
    'components/nav/page.blp',
    'components/navbar/button.blp',
    'components/navbar/index.blp',
    'components/navbar/title.blp',
    'components/paginator.blp',
    'components/player/now-playing/details.blp',
    'components/player/now-playing/view.blp',
    'components/player/video/controls.blp',
    'components/player/video/full.blp',
    'components/player/video/mini.blp',
    'components/player/video/view.blp',
    'components/player/video/volume-controls.blp',
    'components/player/full.blp',
    'components/player/lyrics.blp',
    'components/player/mini.blp',
    'components/player/preview.blp',
    'components/player/queue.blp',
    'components/player/queueitem.blp',
    'components/player/related.blp',
    'components/playlist/add-to-playlist-item.blp',
    'components/playlist/bar.blp',
    'components/playlist/edit.blp',
    'components/playlist/get-add-to-playlist.blp',
    'components/playlist/header.blp',
    'components/playlist/listitem.blp',
    'components/search/section.blp',
    'components/search/topresult.blp',
    'components/search/topresultsection.blp',
    'gtk/help-overlay.blp',
    'pages/album.blp',
    'pages/artist-albums.blp',
    'pages/artist.blp',
    'pages/authentication-error.blp',
    'pages/channel.blp',
    'pages/charts.blp',
    'pages/channel-playlists.blp',
    'pages/error.blp',
    'pages/explore.blp',
    'pages/home.blp',
    'pages/login.blp',
    'pages/mood-playlists.blp',
    'pages/moods.blp',
    'pages/new-releases.blp',
    'pages/playlist.blp',
    'pages/preferences.blp',
    'pages/search.blp',
    'sidebar.blp',
    'window.blp',
  ),
  output: 'ui',
  command: [find_program('blueprint-compiler'), 'batch-compile', '@OUTPUT@', '@CURRENT_SOURCE_DIR@', '@INPUT@'],
)
