
import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import Button from './Buttons'

type BottomSheetProps =React.PropsWithChildren<{
  visible: boolean;
  toggleVisibility: () => void;
}>

const BottomSheet: React.FC<BottomSheetProps> = ({visible, toggleVisibility, children }) => {
  return (
    <Modal visible={visible} animationType='fade' transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          <View style={{ flexDirection: 'row', marginBottom:8, alignItems: "center", justifyContent: "flex-end" }}>
            <View style={{flex:1}} />
            <FontAwesome6 name='xmark' iconStyle='solid' size={20} color='black' onPress={toggleVisibility}/>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: { 
    padding: 36,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  }
})