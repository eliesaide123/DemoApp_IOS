let _settings = {
  language:'0',
  notification:false,
  darkMode:false
}

export function GetEntry(){
  return _settings
}

export function SetEntry(language?: string, notification?: boolean, darkMode?: boolean){
  _settings.language = language ?? _settings.language
  _settings.notification = notification ?? _settings.notification
  _settings.darkMode = darkMode ?? _settings.darkMode
}

export default _settings;
