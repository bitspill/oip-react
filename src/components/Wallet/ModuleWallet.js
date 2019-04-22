import React, { useState, useRef } from 'react'
import withStyles from 'react-jss'
import { Wallet } from 'oip-hdmw'
import styled from 'styled-jss'

import { LoadWallet } from './index'
import WalletHeader from './WalletHeader'
import WalletStateContainer from './WalletStateContainer'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 600px',
    borderRadius: 'inherit',
    border: '1px solid grey'
  }
})

const Container = styled('div')({
  width: (props) => props.width ? props.width : '779px',
  height: (props) => props.height ? props.height : '339px',
  borderRadius: (props) => props.borderRadius ? props.borderRadius : '10px',
  display: 'flex',
  flexDirection: 'row',
})

const ModuleWallet = ({
  classes,
  coins,
  width,
  height,
  borderRadius
}) => {
  const walletRef = useRef(null)
  const [lock, setLock] = useState(true)
  
  function onMnemonicSubmit (mnemonic) {
    walletRef.current = new Wallet(mnemonic, {
      discover: false,
      supported_coins: coins
    })
    setLock(false)
  }
  
  const resetWallet = () => {
    walletRef.current = null
    setLock(true)
  }
  
  return <Container width={width} height={height} borderRadius={borderRadius}>
    <div className={classes.root}>
      <WalletHeader
        resetWallet={resetWallet}
      />
      {lock ? <LoadWallet
          onMnemonicSubmit={onMnemonicSubmit}
        />
        : <WalletStateContainer
          wallet={walletRef.current}
          coins={coins}
        />}
    </div>
  </Container>
}

export default withStyles(styles)(ModuleWallet)
