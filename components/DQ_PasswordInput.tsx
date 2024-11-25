import React, { useState } from 'react';
import { Box, Icon, Input, Pressable } from 'native-base';


//react-native-vector-icons/MaterialIcons

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box alignItems="center">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        variant="outline"
        InputRightElement={
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon
            //   as={MaterialIcons}
              name={showPassword ? "visibility" : "visibility-off"}
              size="sm"
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      />
    </Box>
  );
};

export default PasswordInput;
