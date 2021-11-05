import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { t, Trans } from '@lingui/macro'
import { TYPE } from 'theme'
import { ButtonPrimary, ButtonSecondary } from 'components/Button'
import Modal from 'components/Modal'
import Row, { RowFixed } from 'components/Row'
import useTheme from 'hooks/useTheme'

/* eslint @typescript-eslint/no-var-requires: "off" */

const HeaderRow = styled.div`
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  padding: 0 0 18px 0;
  margin: 0 0 18px 0;
`

const UpperSection = styled.div`
  position: relative;
  padding: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1.5rem;
  `}
`
const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 0 0;
  margin: 20px 0 0 0;
  border-top: 1px solid ${({ theme }) => theme.bg3};
`
const Input = styled.input.attrs({ type: 'checkbox' })`
  padding: 1rem;
  margin: 0 10px 0 0;
  border: 1px solid ${({ theme }) => theme.bg4};
  width: 30px;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.bg4};
  background-color: ${({ theme }) => theme.bg6};
  font-size: 1rem;
  transform: scale(1.5);
  &:focus {
    outline-width: 0 !important;
    color: ${({ theme }) => theme.primary1}
    border: 1px solid ${({ theme }) => theme.primary1}
    outline: none;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  > button:first-child {
    margin-right: 0.25rem;
  }
  > button:last-child {
    margin-left: 0.25rem;
  }
`
const CancelButton = styled(ButtonSecondary)`
  color: ${({ theme }) => theme.bg4};
  border: 1px solid ${({ theme }) => theme.bg4};
  :hover {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
`

const CountryWrapper = styled.div`
  display: flex;
  flex: 50%;
  padding: 8px 0;
`

const RESTRICTED_COUNTRIES: { [key: string]: string } = {
  be: t`Belarus`,
  kp: t`North Korea`,
  ci: t`Cote D’Ivoire (Ivory Coast)`,
  sd: t`Sudan`,
  cu: t`Cuba`,
  sy: t`Syria`,
  cd: t`Democratic Republic of Congo`,
  us: t`United States of America`,
  ir: t`Iran`,
  ve: t`Venezuela`,
  iq: t`Iraq`,
  ye: t`Yemen`,
  lr: t`Liberia`,
  zw: t`Zimbabwe`,
  mm: t`Myanmar (Burma)`,
}

export default function InitialConfirmationModal() {
  const theme = useTheme()
  const [selected, setSelected] = useState(false)
  const [approved, setApproved] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (document.cookie.indexOf('country_approved') !== -1) {
      setApproved(true)
    }
  }, [])

  const checkboxHandler = (value: boolean) => {
    setSelected(value)
    value && setError(false)
  }

  const approveCountry = () => {
    if (!selected) {
      setError(true)
      return
    }
    document.cookie = 'country_approved=true; max-age=' + 60 * 60 * 24 * 365
    setApproved(true)
  }

  return (
    <Modal isOpen={!approved} onDismiss={() => null} minHeight={false} maxHeight={715} wide={true}>
      <Wrapper>
        <UpperSection>
          <HeaderRow>
            <TYPE.mediumHeader style={{ paddingBottom: '10px' }}>
              <Trans>Please confirm your location</Trans>
            </TYPE.mediumHeader>
            <TYPE.body fontSize={14}>
              <Trans>Please confirm that you are not located in one of the following restricted countries</Trans>
            </TYPE.body>
          </HeaderRow>
          <Row style={{ flexWrap: 'wrap' }}>
            {Object.keys(RESTRICTED_COUNTRIES).map((key: string, index: number) => (
              <CountryWrapper key={index}>
                <RowFixed>
                  <img
                    src={require(`assets/images/restricted-countries/${key}.png`).default}
                    alt={RESTRICTED_COUNTRIES[key]}
                  />
                </RowFixed>
                <RowFixed style={{ padding: '0 10px' }}>{RESTRICTED_COUNTRIES[key]}</RowFixed>
              </CountryWrapper>
            ))}
          </Row>
          <InputWrapper>
            <label style={{ cursor: 'pointer', fontSize: '14px', display: 'flex', flex: '50%' }}>
              <RowFixed>
                <Input onChange={(ev) => checkboxHandler(ev.target.checked)} />
              </RowFixed>
              <RowFixed style={{ paddingLeft: '6px', color: error ? theme.error : theme.text3 }}>
                <Trans>I confirm that I am not a current resident of any of the listed countries.</Trans>
              </RowFixed>
            </label>
          </InputWrapper>
          <ButtonWrapper>
            <CancelButton
              onClick={() => (window.location.href = 'https://www.niifi.com')}
              style={{ textTransform: 'uppercase' }}
            >
              <Trans>Cancel</Trans>
            </CancelButton>
            <ButtonPrimary onClick={() => approveCountry()} style={{ textTransform: 'uppercase' }}>
              <Trans>Continue</Trans>
            </ButtonPrimary>
          </ButtonWrapper>
        </UpperSection>
      </Wrapper>
    </Modal>
  )
}
