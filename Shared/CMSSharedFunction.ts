import CMSData_JSON from '../contents/CMSData.json';

interface CMS_Entry {
  _id: string;
  Tag: string;
  English: string;
  Arabic: string | null;
  French: string | null;
  Spanish: string | null;
  German: string | null;
}

let _CMS_Labels: CMS_Entry[] = CMSData_JSON;

export function Get_CMS_Entry(tag: string, suffix: string, language: string = "en") {
  let toRet = '';
  let match = _CMS_Labels.filter(x => x.Tag === `${tag}_${suffix}`);

  if (match.length === 0) {
    match = _CMS_Labels.filter(x => x.Tag === `${tag}`);
  }

  if (match.length > 0) {
    switch (language) {
      case "0":
        toRet = match[0].English;
        break;
      case "1":
        toRet = match[0].Arabic || "";
        if(toRet == ""){
            toRet = match[0].English;
        }
        break;      
    }    
  } else {
    toRet = `${tag}: Tag Not Found!`;
  }

  return toRet;
}
