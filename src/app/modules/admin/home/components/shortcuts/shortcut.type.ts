export interface Shortcut {
  id: string;
  customTitle?: string;
  description?: string;
  svgIcon?: string;
  icon?: string;
  link?: string;
  useRouter: boolean;
}
