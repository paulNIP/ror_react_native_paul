import React, { useState } from 'react';
import { Modal, View, Pressable, Text, StyleSheet } from 'react-native';

const CustomAlert = ({ ios, buttons = [{}], setModalVisible, modalVisible, title = 'Message', message = '' }) => {
    const [iOSDefaults, setIOSDefaults] = useState({
        container: {
            backgroundColor: ios?.container?.backgroundColor || '#F8F8F8',
        },
        title: {
            color: ios?.title?.color || '#000000',
            fontFamily: ios?.title?.fontFamily || 'initial',
            fontSize: ios?.title?.fontSize || 17,
            fontWeight: ios?.title?.fontWeight || '600',
        },
        message: {
            color: ios?.message?.color || '#000000',
            fontFamily: ios?.message?.fontFamily || 'initial',
            fontSize: ios?.message?.fontSize || 13,
            fontWeight: ios?.message?.fontWeight || 'normal',
        },
        button: {
            color: '#387ef5',
            fontFamily: 'initial',
            fontSize: 17,
            fontWeight: '500',
            textTransform: 'none',
            backgroundColor: 'transparent',
        },
    });

    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(buttons.length === 2 ? 1 : 0);

    const onButtonPress = (func) => {
        setModalVisible(false);
        typeof func === 'function' && func();
    };

    const buttonTextOutput = (item, index) => {
        let defaultButtonText = 'OK';
        if (buttons.length > 2) {
            if (index === 0) defaultButtonText = 'ASK ME LATER';
            else if (index === 1) defaultButtonText = 'CANCEL';
        } else if (buttons.length === 2 && index === 0) defaultButtonText = 'CANCEL';

        return item.text || defaultButtonText;
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <Pressable
                style={[styles.backdrop]}
                onPress={() => setModalVisible(false)}
            />
            <View style={styles.alertBox}>
                <View style={[styles.iOSAlertBox, iOSDefaults.container]}>
                    <Text style={[styles.iOSTitle, iOSDefaults.title]}>{title}</Text>
                    <Text style={[styles.iOSMessage, iOSDefaults.message]}>{message}</Text>
                    <View
                        style={[styles.buttonGroup, { flexDirection: buttonLayoutHorizontal === 1 ? 'row' : 'column' }]}
                        onLayout={(e) => (e.nativeEvent.layout.height > 60) && setButtonLayoutHorizontal(0)}
                    >
                        {
                            buttons.map((item, index) => (
                                <View style={[styles.button, index === 0 && buttonLayoutHorizontal === 1 && { minWidth: '50%', borderStyle: 'solid', borderRightWidth: 0.55, borderRightColor: '#dbdbdf' }]} key={index}>
                                    <Pressable onPress={() => onButtonPress(item.func)}>
                                        <View style={[styles.buttonInner, { backgroundColor: item.styles?.backgroundColor || iOSDefaults.button.backgroundColor }]}>
                                            <Text style={{
                                                color: item.styles?.color || iOSDefaults.button.color,
                                                fontFamily: item.styles?.fontFamily || iOSDefaults.button.fontFamily,
                                                fontSize: item.styles?.fontSize || iOSDefaults.button.fontSize,
                                                fontWeight: item.styles?.fontWeight || (index === buttons.length - 1 ? '700' : iOSDefaults.button.fontWeight),
                                                textTransform: item.styles?.textTransform || iOSDefaults.button.textTransform,
                                                textAlign: 'center'
                                            }}>{buttonTextOutput(item, index)}</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000000",
        opacity: 0.3,
    },
    alertBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iOSAlertBox: {
        maxWidth: 270,
        width: '100%',
        zIndex: 10,
        borderRadius: 13,
    },
    iOSTitle: {
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 7,
        paddingLeft: 16,
        marginTop: 8,
        textAlign: 'center',
    },
    iOSMessage: {
        paddingTop: 0,
        paddingRight: 16,
        paddingBottom: 21,
        paddingLeft: 16,
        textAlign: 'center',
    },
    buttonGroup: {
        marginRight: -0.55,
    },
    button: {
        borderTopColor: '#dbdbdf',
        borderTopWidth: 0.55,
        borderStyle: 'solid',
    },
    buttonInner: {
        minHeight: 44,
        justifyContent: 'center',
    },
});

export default CustomAlert;