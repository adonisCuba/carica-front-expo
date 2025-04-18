import React, { useState, useEffect, useCallback } from 'react';
import { TextInput, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { APPCOLORS } from '../utils/colors';
import { getPlaces } from '../utils/getPlaces';
import { GetPlacesResponse } from '../interfaces/googlePlaces';


interface SuggestionInputProps {
    value: string;
    onChange: (value: string) => void;
    onSuggestionSelected: (suggestion: GetPlacesResponse) => void;
    placeholder?: string
}

const SuggestionsInput: React.FC<SuggestionInputProps> = ({ value, onChange, onSuggestionSelected, placeholder = 'Buscar' }) => {
    const [debouncedText, setDebouncedText] = useState('');
    const [suggestions, setSuggestions] = useState<GetPlacesResponse[]>([]);
    const [isSelectingSuggestion, setIsSelectingSuggestion] = useState(false);
    console.log('VALUE',value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedText(value);
        }, 300); // Debounce delay
        return () => clearTimeout(handler);
    }, [value]);

    useEffect(() => {
        if (isSelectingSuggestion) {
            setIsSelectingSuggestion(false);
            return;
        }
        if (debouncedText) {
            fetchPlaces(debouncedText);
        } else {
            setSuggestions([]);
        }
    }, [debouncedText]);

    const fetchPlaces = async (query: string) => {
        const mockData = await getPlaces(query);
        setSuggestions(mockData as any);
    };

    const handleSuggestionPress = useCallback((suggestion: GetPlacesResponse) => {
        setIsSelectingSuggestion(true);
        onChange(`${suggestion.first.trim()} ${suggestion.secondary.trim()}`);
        onSuggestionSelected(suggestion);
        setSuggestions([]);
    }, [onChange, onSuggestionSelected]);

    return (
        <View>
            <View style={styles.inputContainer}>
                <View style={styles.inputContent}>

                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        placeholder={placeholder}
                        style={styles.input}
                        placeholderTextColor={APPCOLORS.darkGray}
                    />
                </View>

            </View>
            <ScrollView style={{ marginTop: 10, maxHeight: 150 }}>
                {suggestions.length > 0 && (
                    suggestions.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSuggestionPress(item)}
                            style={{
                                flexDirection: 'row',
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>{item.first}, </Text>
                            <Text>{item.secondary}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: 16,
        color: APPCOLORS.primary,
        height: '100%',
        paddingHorizontal: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        height: 55,
        borderRadius: 12,
        marginTop: 10,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: APPCOLORS.tertiary

    },
    inputContent: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 50,
        borderRadius: 12,
        marginVertical: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        backgroundColor: APPCOLORS.tertiary
    },
})
export default SuggestionsInput;
