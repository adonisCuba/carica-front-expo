// config/fontScaling.ts
import { Text, TextInput } from 'react-native';

export const configureFontScaling = () => {
  if (Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
  } else {
    Text.defaultProps = {
      allowFontScaling: false
    };
  }

  if (TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
  } else {
    TextInput.defaultProps = {
      allowFontScaling: false
    };
  }
};


