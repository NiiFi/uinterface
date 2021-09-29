import React from 'react'
import { DiscordIcon, TwitterIcon, TelegramIcon } from '../Icons'
import styled from 'styled-components/macro'

type TSocialLink = {
  Icon: any
  name: string
  link: string
}
const SupportedSocialLinks: Array<TSocialLink> = [
  {
    Icon: TelegramIcon,
    link: process.env.REACT_APP_TELEGRAM || 'https://t.me/NiiFiDAO',
    name: 'Telegram',
  },
  {
    Icon: TwitterIcon,
    link: process.env.REACT_APP_TWITTER || 'https://twitter.com/NiiFiDAO',
    name: 'Twitter',
  },
  {
    Icon: DiscordIcon,
    link: process.env.REACT_APP_DISCORD || 'https://discord.gg/ssjzvjZX89',
    name: 'Discord',
  },
]
const StyledSocialLink = styled.a`
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.bg4};
  border-radius: 50%;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  justify-content: center;
  margin: 0px 0.625rem;

  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
`
const StyledSocialLinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
function SocialLink({ name, Icon, link }: TSocialLink) {
  return (
    <StyledSocialLink href={link} target="_blank" id={name}>
      <Icon width={'32px'} height={'32'} />
    </StyledSocialLink>
  )
}
export default function SocialLinks() {
  return (
    <StyledSocialLinkWrapper>
      {SupportedSocialLinks.map((socialLink, socialLinkIdx) => (
        <SocialLink key={socialLinkIdx} {...socialLink} />
      ))}
    </StyledSocialLinkWrapper>
  )
}
