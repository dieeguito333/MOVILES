import colors from './colors';

export default {
  colors: {
    ...colors,
  },
  Button: {
    buttonStyle: {
      borderRadius: 8,
      backgroundColor: colors.primary,
    },
    titleStyle: {
      color: colors.onPrimary,
      fontWeight: 'bold',
    },
    containerStyle: {
      marginVertical: 10,
    },
  },
  Input: {
    inputContainerStyle: {
      borderBottomWidth: 0,
      backgroundColor: colors.grey1,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    inputStyle: {
      color: colors.onBackground,
    },
    containerStyle: {
      paddingHorizontal: 0,
    },
    labelStyle: {
      color: colors.grey5,
      marginBottom: 5,
    },
    errorStyle: {
      color: colors.error,
    },
  },
};