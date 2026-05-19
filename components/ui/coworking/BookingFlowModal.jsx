import React, { useState } from 'react';
import { View, Text, Modal, Pressable, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookingFlowModal({ visible, space, onClose }) {
    const [step, setStep] = useState(1);
    const [selectedTime, setSelectedTime] = useState(null);
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!space) return null;

    const handleConfirm = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onClose(); // Cerrar modal de reserva
            setStep(1); // Reset state
            setSelectedTime(null);
            setPhone('');
            setNotes('');
            Alert.alert(
                "¡Reserva Confirmada!", 
                `Has reservado ${space.nombre} a las ${selectedTime}.`
            );
        }, 2000);
    };

    const handleClose = () => {
        setStep(1);
        setSelectedTime(null);
        setPhone('');
        setNotes('');
        onClose();
    };

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={handleClose}>
            <View className="flex-1 justify-center bg-black/60 px-4">
                <View className="bg-white rounded-3xl p-6">
                    {/* Header */}
                    <View className="flex-row items-center mb-6">
                        {step > 1 && !isSubmitting ? (
                            <Pressable onPress={() => setStep(step - 1)} className="mr-3">
                                <Ionicons name="arrow-back" size={24} color="#0f172a" />
                            </Pressable>
                        ) : (
                            <View className="w-9" /> // Spacer
                        )}
                        <Text className="flex-1 text-xl font-SpaceGroteskBold text-center text-slate-900">
                            Paso {step} de 3
                        </Text>
                        <Pressable onPress={handleClose} className="w-9 items-end" disabled={isSubmitting}>
                            <Ionicons name="close" size={24} color={isSubmitting ? "#94a3b8" : "#0f172a"} />
                        </Pressable>
                    </View>

                    {/* Step 1: Horarios */}
                    {step === 1 && (
                        <View>
                            <Text className="text-lg font-SpaceGroteskBold text-slate-800 mb-4">Selecciona tu horario</Text>
                            <View className="flex-row flex-wrap gap-3 mb-6">
                                {['12:00h', '13:00h', '15:00h', '17:00h'].map((time) => (
                                    <Pressable
                                        key={time}
                                        onPress={() => setSelectedTime(time)}
                                        className={
                                            selectedTime === time 
                                                ? "w-[47%] py-3 rounded-xl border bg-slate-900 border-slate-900 items-center" 
                                                : "w-[47%] py-3 rounded-xl border bg-white border-slate-200 items-center"
                                        }
                                    >
                                        <Text className={selectedTime === time ? "font-InterMedium text-white" : "font-InterMedium text-slate-700"}>
                                            {time}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                            <Pressable
                                onPress={() => setStep(2)}
                                disabled={!selectedTime}
                                className={
                                    selectedTime 
                                        ? "w-full py-4 rounded-2xl items-center bg-blue-600 active:bg-blue-700" 
                                        : "w-full py-4 rounded-2xl items-center bg-slate-200"
                                }
                            >
                                <Text className={selectedTime ? "text-lg font-InterBold text-white" : "text-lg font-InterBold text-slate-400"}>
                                    Siguiente
                                </Text>
                            </Pressable>
                        </View>
                    )}

                    {/* Step 2: Formulario */}
                    {step === 2 && (
                        <View>
                            <Text className="text-lg font-SpaceGroteskBold text-slate-800 mb-4">Datos adicionales</Text>
                            
                            <View className="mb-4">
                                <Text className="text-sm font-InterMedium text-slate-600 mb-2">Número celular alternativo</Text>
                                <TextInput
                                    className="border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-slate-900 font-InterRegular"
                                    placeholder="Ej: 300 123 4567"
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                            </View>

                            <View className="mb-6">
                                <Text className="text-sm font-InterMedium text-slate-600 mb-2">Notas / Necesidad especial</Text>
                                <TextInput
                                    className="border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-slate-900 h-24 font-InterRegular"
                                    placeholder="Ej: Necesito tablero, sillas extra..."
                                    multiline
                                    textAlignVertical="top"
                                    value={notes}
                                    onChangeText={setNotes}
                                />
                            </View>

                            <Pressable
                                onPress={() => setStep(3)}
                                className="w-full py-4 rounded-2xl items-center bg-blue-600"
                            >
                                <Text className="text-lg font-InterBold text-white">Continuar al Resumen</Text>
                            </Pressable>
                        </View>
                    )}

                    {/* Step 3: Resumen */}
                    {step === 3 && (
                        <View>
                            <Text className="text-lg font-SpaceGroteskBold text-slate-800 mb-4">Resumen de la Reserva</Text>
                            
                            <View className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                                <View className="flex-row justify-between mb-3">
                                    <Text className="text-slate-500 font-InterRegular">Espacio:</Text>
                                    <Text className="font-InterSemiBold text-slate-900">{space.nombre}</Text>
                                </View>
                                <View className="flex-row justify-between mb-3">
                                    <Text className="text-slate-500 font-InterRegular">Horario:</Text>
                                    <Text className="font-InterSemiBold text-slate-900">{selectedTime}</Text>
                                </View>
                                <View className="flex-row justify-between">
                                    <Text className="text-slate-500 font-InterRegular">Teléfono:</Text>
                                    <Text className="font-InterSemiBold text-slate-900">{phone || 'No provisto'}</Text>
                                </View>
                            </View>

                            <Pressable
                                onPress={handleConfirm}
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-2xl items-center flex-row justify-center bg-slate-900"
                            >
                                {isSubmitting ? (
                                    <>
                                        <ActivityIndicator color="#ffffff" className="mr-2" />
                                        <Text className="text-lg font-InterBold text-white">Procesando...</Text>
                                    </>
                                ) : (
                                    <Text className="text-lg font-InterBold text-white">Confirmar Reserva</Text>
                                )}
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}
