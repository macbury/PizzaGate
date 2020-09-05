import React, { useRef, useEffect } from 'react'
import { ScrollViewProps } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import styled from 'styled-components/native'

const ScrollContainer = styled.ScrollView`
  width: 100%;
  min-width: 300px;
  display: flex;
  flex: 1;
`

const ScrollCenter = styled.View`
  max-width: ${({ theme }) => theme.device === 'desktop' ? '800px' : '480px'};
  margin: ${({ theme }) => theme.device === 'desktop' ? '0 auto' : '0px auto'};
  margin-top: ${({ theme }) => theme.device === 'desktop' ? '70px' : '10px'};
  margin-bottom: ${({ theme }) => theme.device === 'desktop' ? '70px' : '100px'};
  width: 100%;
`

interface ICenteredScrollViewProps extends ScrollViewProps {
  children?: any
}

export default React.forwardRef(function CenteredScrollView({ children, onLayout, ...props } : ICenteredScrollViewProps, forwardedRef : any) {
  const scrollViewRef = useRef()
  useScrollToTop(scrollViewRef)

  useEffect(() => {
    if (forwardedRef) {
      forwardedRef.current = scrollViewRef.current
    }
  }, [scrollViewRef, forwardedRef])

  return (
    <ScrollContainer {...props} ref={scrollViewRef}>
      <ScrollCenter onLayout={onLayout}>
        {children}
      </ScrollCenter>
    </ScrollContainer>
  )
})