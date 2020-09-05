import React from 'react'
import styled from 'styled-components/native'

const NotificationContainer = styled.SafeAreaView`
  position: absolute;
  bottom: ${({ theme }) => theme.device === 'desktop' ? '60px' : '50px' };
  left: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px' };
  border-radius: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px' };
  width: ${({ theme }) => theme.device === 'desktop' ? 'auto' : '100%' };
  min-width: 300px;
  background: ${({ theme }) => theme.colors.primary};
`

const MessageText = styled.View`
  padding: 15px 25px;
  color: ${({ theme }) => theme.colors.notificationTextColor};
  font-family: ${({ theme }) => theme.font.main};
`

const Action = styled.TouchableOpacity`
`

/**
 * Display notifications
 */
export default function Notifications() {
  return null
  return (
    <NotificationContainer>
      <MessageText>You have created a new icon!</MessageText>
    </NotificationContainer>
  )
}