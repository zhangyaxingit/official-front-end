export interface IBanner {
    title: string
    bgUrl: string
    imgUrl: string
  }
  
  export interface IIntroduction {
    name: string
    desc: string
  }
  
  export interface IValueItem {
    title: string
    text: string
    img: string
  }
  
  export interface IValue {
    name: string
    list: IValueItem[]
  }
  
  export interface ICertItem {
    title: string
    img: string
  }
  
  export interface ICert{
    name: string
    list: ICertItem[]
  }
  
  export interface IIntroduction {
    name: string
    desc: string
  }
  
  export interface IHistoryItem {
    date: string
    desc: string
  }
  
  export interface IHistory {
    title: string
    subTitle: string
    list: IHistoryItem[]
  }
  
  export interface IAbout {
    banner: IBanner
    introduction: IIntroduction
    values: IValue
    credentials: ICert
    history: IHistory
  }
  
  export interface IJobItem {
    name: string
    duty: string[]
    request: string[]
    email: string
  }
  
  export interface Iemploy {
    banner: IBanner
    jobs: IJobItem[]
  }
  
  export interface IDetail {
    email: string[]
    tel: string[]
    fax: string
  }
  
  export interface Icontact {
    banner: IBanner
    details: IDetail
  }
  
  export interface IAboutState {
    about: IAbout
    employ: Iemploy
    contact: Icontact
  }
