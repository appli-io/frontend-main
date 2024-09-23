export interface PanelType {
  id?: string,
  icon?: string,
  title: string,
  description: string,
  link?: string,
  disabled?: boolean,
  children?: PanelType[]
}
