import React from 'react'
import { MinusCircle, IconProps as RAIconProps } from 'react-feather'
type IconProps = React.SVGProps<SVGSVGElement>
export function DiscordIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M10.1185 11.551C9.61598 11.551 9.21925 12.001 9.21925 12.55C9.21925 13.099 9.6248 13.549 10.1185 13.549C10.621 13.549 11.0178 13.099 11.0178 12.55C11.0266 12.001 10.621 11.551 10.1185 11.551ZM13.3365 11.551C12.8339 11.551 12.4372 12.001 12.4372 12.55C12.4372 13.099 12.8428 13.549 13.3365 13.549C13.839 13.549 14.2357 13.099 14.2357 12.55C14.2357 12.001 13.839 11.551 13.3365 11.551Z"
        fill={color}
      />
      <path
        d="M17.6212 4H5.80735C4.8111 4 4 4.828 4 5.854V18.022C4 19.048 4.8111 19.876 5.80735 19.876H15.8051L15.3378 18.211L16.4663 19.282L17.5331 20.29L19.4286 22V5.854C19.4286 4.828 18.6175 4 17.6212 4ZM14.2181 15.754C14.2181 15.754 13.9007 15.367 13.6362 15.025C14.7912 14.692 15.232 13.954 15.232 13.954C14.8705 14.197 14.5267 14.368 14.2181 14.485C13.7773 14.674 13.3541 14.8 12.9398 14.872C12.0934 15.034 11.3176 14.989 10.6563 14.863C10.1538 14.764 9.7218 14.62 9.36033 14.476C9.15755 14.395 8.93714 14.296 8.71673 14.17C8.69029 14.152 8.66384 14.143 8.63739 14.125C8.61975 14.116 8.61094 14.107 8.60212 14.098C8.44343 14.008 8.35527 13.945 8.35527 13.945C8.35527 13.945 8.77845 14.665 9.89812 15.007C9.63363 15.349 9.30743 15.754 9.30743 15.754C7.35902 15.691 6.61845 14.386 6.61845 14.386C6.61845 11.488 7.888 9.139 7.888 9.139C9.15755 8.167 10.3654 8.194 10.3654 8.194L10.4536 8.302C8.86661 8.77 8.13486 9.481 8.13486 9.481C8.13486 9.481 8.32882 9.373 8.65502 9.22C9.59837 8.797 10.3478 8.68 10.6563 8.653C10.7092 8.644 10.7533 8.635 10.8062 8.635C11.344 8.563 11.9523 8.545 12.5871 8.617C13.4247 8.716 14.3239 8.968 15.2408 9.481C15.2408 9.481 14.5443 8.806 13.0456 8.338L13.169 8.194C13.169 8.194 14.3768 8.167 15.6464 9.139C15.6464 9.139 16.9159 11.488 16.9159 14.386C16.9159 14.386 16.1665 15.691 14.2181 15.754Z"
        fill={color}
      />
    </svg>
  )
}

export function TelegramIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.41418 11.1954C7.93627 8.83662 11.6185 7.28157 13.461 6.53025C18.7215 4.38508 19.8145 4.01244 20.527 4.00013C20.6837 3.99742 21.0341 4.0355 21.261 4.21605C21.4527 4.3685 21.5054 4.57444 21.5306 4.71899C21.5558 4.86353 21.5873 5.1928 21.5623 5.45008C21.2772 8.38666 20.0437 15.513 19.4162 18.802C19.1507 20.1937 18.6278 20.6603 18.1217 20.706C17.0216 20.8052 16.1863 19.9933 15.1209 19.3085C13.4537 18.2371 12.5119 17.5701 10.8936 16.5246C9.0234 15.3163 10.2358 14.6522 11.3016 13.5668C11.5805 13.2828 16.4272 8.96067 16.5211 8.56858C16.5328 8.51955 16.5437 8.33676 16.4329 8.24024C16.3222 8.14373 16.1587 8.17673 16.0407 8.20298C15.8735 8.24019 13.2102 9.96608 8.05072 13.3807C7.29474 13.8896 6.61 14.1376 5.99649 14.1246C5.32015 14.1103 4.01914 13.7497 3.05198 13.4414C1.86571 13.0634 0.922885 12.8635 1.00498 12.2214C1.04775 11.887 1.51748 11.545 2.41418 11.1954Z"
        fill={color}
      />
    </svg>
  )
}
export function TwitterIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M8.4693 20.7143C16.2321 20.7143 20.4781 14.2832 20.4781 8.70628C20.4781 8.52361 20.4781 8.34178 20.4657 8.16076C21.2917 7.56333 22.0048 6.8236 22.5714 5.97621C21.8012 6.31768 20.984 6.54151 20.1473 6.64021C21.0284 6.11284 21.6878 5.28326 22.0028 4.30592C21.1744 4.79755 20.268 5.144 19.3228 5.33031C18.6864 4.65371 17.8448 4.20568 16.9282 4.05555C16.0115 3.90543 15.0709 4.06158 14.252 4.49984C13.433 4.9381 12.7813 5.63404 12.3978 6.47996C12.0142 7.32589 11.9202 8.27463 12.1302 9.17939C10.4522 9.09522 8.81065 8.65916 7.3121 7.89952C5.81356 7.13988 4.49151 6.07363 3.43177 4.76998C2.89205 5.69906 2.72675 6.7989 2.96951 7.84557C3.21228 8.89225 3.84486 9.80705 4.73847 10.4037C4.06677 10.384 3.4097 10.2029 2.82286 9.87548V9.92896C2.82312 10.9033 3.16044 11.8476 3.7776 12.6017C4.39476 13.3557 5.25377 13.8731 6.20891 14.066C5.58755 14.2355 4.93561 14.2603 4.30318 14.1384C4.57298 14.9769 5.09808 15.7102 5.80506 16.2357C6.51204 16.7612 7.36557 17.0526 8.24631 17.0693C7.37123 17.7571 6.36913 18.2656 5.29732 18.5657C4.22552 18.8659 3.10504 18.9518 2 18.8185C3.93014 20.057 6.17594 20.714 8.4693 20.711"
        fill={color}
      />
    </svg>
  )
}

export function DashboardIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M7 7H17M14 12H17M7 12H10M8 17L7 17M17 17H16M12.5556 17L11.5 17M2 2H22V22H2V2Z"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function DiscoverIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M22 12C22 14.7407 21.0185 17.1111 19.0556 19.1111C18.2037 19.963 17.3148 20.6296 16.3889 21.1111C15.1296 21.6667 13.7593 21.963 12.2778 22C12.1667 22 12.0741 22 12 22C9.25926 22 6.90741 21.037 4.94444 19.1111C2.98148 17.1111 2 14.7407 2 12C2 9.25926 2.98148 6.92593 4.94444 5C6.90741 3 9.25926 2 12 2C14.7407 2 17.0926 3 19.0556 5C21.0185 6.92593 22 9.25926 22 12ZM10.7222 10.7222L15.8095 8.19048L13.4444 13.4444L8.19048 15.8095L10.7222 10.7222Z"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function LendIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M22.5002 21.96L18.0602 12.72C15.5541 11.738 13.6941 10.438 12.4802 8.82001L10.5602 9.90001C11.0002 11.3 12.1402 12.7 13.9802 14.1L7.38017 16.02C5.17689 16.1633 3.97689 14.9433 3.78017 12.36H1.50017C1.30017 16.3322 3.06017 18.5922 6.78017 19.14H15.6002L17.0002 21.96M9.00024 5C9.00024 6.65685 7.6571 8 6.00024 8C4.34339 8 3.00024 6.65685 3.00024 5C3.00024 3.34315 4.34339 2 6.00024 2C7.6571 2 9.00024 3.34315 9.00024 5Z"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function PoolIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M17.3168 8.79882L21 6.66258M17.3168 8.79882L12.0297 5.77248M17.3168 8.79882L12.0297 11.8845M21 6.66258L12.0297 1.5M21 6.66258V17.1064L12.0297 22.269M12.0297 1.5V5.77248M12.0297 1.5L3 6.66258M12.0297 5.77248L6.77228 8.85816M12.0297 11.8845V22.269M12.0297 11.8845L6.77228 8.85816M12.0297 22.269L3 17.1064V6.66258M3 6.66258L6.77228 8.85816"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}
export function FarmIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M12 15.8291C12 10.5724 8.325 8.05836 3 8.17264C3.15 13.7722 6.375 15.8291 12 15.8291ZM12 15.8291V9.65823M12 15.8291V22.0001M12 9.65823C12 4.38247 15.7125 1.92553 21 2.00172C20.8875 7.60125 17.625 9.65823 12 9.65823ZM5.08125 22.0001H12M12 22.0001H18.5625"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function SwapIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M20.1009 7.02917V2M20.1009 7.02917H15.2451M20.1009 7.02917C18.7403 4.98025 16.8871 3.62983 14.5413 2.9779C12.1017 2.32597 9.80281 2.62865 7.64468 3.88594C5.39271 5.14323 3.96178 6.98261 3.35187 9.40406C3.11729 10.2888 3 11.1503 3 11.9885M21 11.2909C21 12.0825 20.8827 12.8974 20.6481 13.7356C19.9913 16.2037 18.5838 18.0663 16.4257 19.3236C14.1737 20.5809 11.8514 20.8603 9.45868 20.1618C7.01905 19.5099 5.16587 18.1129 3.89914 15.9708M3.89914 15.9708V21M3.89914 15.9708H8.82532"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}
export function LanguageIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M21.4444 15.3333C21.8148 14.2909 22 13.1798 22 12C22 10.8124 21.8148 9.70124 21.4444 8.66667M21.4444 15.3333C20.9698 16.7128 20.1735 17.9721 19.0556 19.1111C18.2037 19.963 17.3148 20.6296 16.3889 21.1111C15.1296 21.6667 13.7593 21.963 12.2778 22C12.2166 22 12.161 22 12.1111 22M21.4444 15.3333H16.1389M12.1111 22C12.0739 22 12.0369 22 12 22M12.1111 22C12.8148 21.963 13.4259 21.6667 13.9444 21.1111C14.3519 20.6296 14.7407 19.963 15.1111 19.1111C15.5962 17.9721 15.9388 16.7128 16.1389 15.3333M12 22C9.25926 22 6.90741 21.037 4.94444 19.1111C3.82653 17.9721 3.03024 16.7128 2.55556 15.3333M12 22C10.826 21.9414 9.82596 20.9784 9 19.1111C8.47266 17.9721 8.09303 16.7128 7.86111 15.3333M2.55556 15.3333C2.18519 14.2909 2 13.1798 2 12C2 10.8124 2.18519 9.70124 2.55556 8.66667M2.55556 15.3333H7.86111M2.55556 8.66667C3.03573 7.31366 3.83203 6.09144 4.94444 5C6.90741 3 9.25926 2 12 2M2.55556 8.66667H7.86111M12 2H12.1389M12 2C10.8385 2.03125 9.83854 3.03125 9 5C8.47526 6.09129 8.09563 7.31351 7.86111 8.66667M12.1389 2C14.8209 2.03458 17.1264 3.03458 19.0556 5C20.168 6.09144 20.9643 7.31366 21.4444 8.66667M12.1389 2C13.3247 2.04688 14.3154 3.04688 15.1111 5C15.5939 6.09129 15.9365 7.31351 16.1389 8.66667M21.4444 8.66667H16.1389M16.1389 8.66667C16.3056 9.70124 16.3889 10.8124 16.3889 12C16.3889 13.1798 16.3056 14.2909 16.1389 15.3333M16.1389 8.66667H7.86111M16.1389 15.3333H7.86111M7.86111 8.66667C7.69444 9.70124 7.61111 10.8124 7.61111 12C7.61111 13.1798 7.69444 14.2909 7.86111 15.3333"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowDownIcon({ width = 24, height = 24, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M7 1L7 12.4035M7 12.4035L12 7.66667M7 12.4035L2 7.66667"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}
export function ArrowUpIcon(props: IconProps) {
  return <ArrowDownIcon {...props} style={{ transform: 'rotate(180deg)' }} />
}

export function PencilIcon({ width = 23, height = 23, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.8491 0.585693L22.0918 4.82833L8.26699 18.6531L2.63183 20.0456L4.02435 14.4105L17.8491 0.585693ZM17.8491 3.41412L16.4349 4.82833L17.8491 6.24255L19.2633 4.82833L17.8491 3.41412ZM16.4349 7.65676L15.0207 6.24255L5.83235 15.4309L5.36817 17.3093L7.24656 16.8451L16.4349 7.65676Z"
        fill={color}
      />
    </svg>
  )
}

export function WalletIcon({ width = 21, height = 19, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 3C0 1.34315 1.34315 0 3 0H18V4H20V8H21V15H20V19H3C1.34315 19 0 17.6569 0 16V3ZM2 5.82929V16C2 16.5523 2.44772 17 3 17H18V15H15C13.3431 15 12 13.6569 12 12V11C12 9.34315 13.3431 8 15 8H18V6H3C2.64936 6 2.31278 5.93985 2 5.82929ZM2 3C2 3.55228 2.44772 4 3 4H16V2H3C2.44772 2 2 2.44772 2 3ZM15 10C14.4477 10 14 10.4477 14 11V12C14 12.5523 14.4477 13 15 13H19V10H15Z"
        fill={color}
      />
    </svg>
  )
}

export function PlusIcon({ width = 20, height = 20, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path d="M0 10H20M10 0L10 20" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export function CopyIcon({ width = 18, height = 20, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path d="M13 3V1H1V15H3M5 5H17V19H5V5Z" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export function LinkIcon({ width = 18, height = 20, color = 'currentColor', ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M9 1H5C2.79086 1 1 2.79086 1 5C1 7.20914 2.79086 9 5 9H9M11 1H15C17.2091 1 19 2.79086 19 5C19 7.20914 17.2091 9 15 9H11M6 5H14"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  )
}

export function RemoveIcon(props: RAIconProps) {
  return <MinusCircle {...props} style={{ transform: 'rotate(90deg)' }} />
}
