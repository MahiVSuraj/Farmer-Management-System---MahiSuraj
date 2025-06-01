import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from "react-native";

const SignUpPage = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    aadhaar: "",
    region: "",
    password: "",
  });
  const [validationMessage, setValidationMessage] = useState("");

  const handleValidation = () => {
    const { username, email, mobile, aadhaar, region, password } = formData;

    if (!username || !email || !mobile || !aadhaar || !region || !password) {
      setValidationMessage("*All fields are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationMessage("Invalid email address");
      return;
    }

    if (mobile.length !== 10 || isNaN(Number(mobile))) {
      setValidationMessage("Mobile number must be 10 digits");
      return;
    }

    if (aadhaar.length !== 12 || isNaN(Number(aadhaar))) {
      setValidationMessage("Aadhaar must be 12 digits");
      return;
    }

    setValidationMessage("");
    handleSubmit();
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Registration successful!", [
          {
            text: "OK",
            onPress: () => navigation.replace("HomePage"),
          },
        ]);
      } else {
        Alert.alert("Error", data.detail || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while registering.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginTop: height * 0.1 }}>
          <Text style={[styles.title, { fontSize: height * 0.04 }]}>Create Your Account</Text>
          <Text style={[styles.subtitle, { fontSize: height * 0.035 }]}>Welcome to Kissan</Text>
          <Text
            style={[styles.description, { fontSize: height * 0.02, marginHorizontal: width * 0.1 }]}
          >
            Please fill in the details below to create your account and start exploring.
          </Text>

          {Object.entries({
            username: "Username",
            email: "Email",
            mobile: "Mobile Number",
            aadhaar: "Aadhaar Number",
            region: "Region",
            password: "Password",
          }).map(([key, placeholder], index) => (
            <TextInput
              key={index}
              placeholder={placeholder}
              placeholderTextColor="#4F772D"
              secureTextEntry={key === "password"}
              keyboardType={key === "mobile" || key === "aadhaar" ? "numeric" : "default"}
              style={[
                styles.input,
                {
                  marginBottom: height * 0.02,
                  height: height * 0.07,
                  fontSize: height * 0.018,
                  marginHorizontal: width * 0.09,
                },
              ]}
              value={formData[key]}
              onChangeText={(value) => handleInputChange(key, value)}
            />
          ))}

          {validationMessage ? (
            <View style={{ alignItems: "center", marginBottom: height * 0.02 }}>
              <Text style={{ color: "#8B0000" }}>{validationMessage}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, { height: height * 0.07, marginHorizontal: width * 0.09 }]}
            onPress={() => {
              Keyboard.dismiss();
              handleValidation();
            }}
          >
            <Text style={[styles.buttonText, { fontSize: height * 0.02 }]}>Sign Up</Text>
          </TouchableOpacity>

          <Text
            style={[styles.signupText, { marginTop: height * 0.02, fontSize: height * 0.018 }]}
          >
            Already have an account? {" "}
            <Text style={styles.signupLink} onPress={() => navigation.navigate("Login")}>Log In</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E5AB",
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C5F2D",
  },
  subtitle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C5F2D",
  },
  description: {
    textAlign: "center",
    color: "#2C5F2D",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#C3C8C8",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#2C5F2D",
  },
  button: {
    backgroundColor: "#6A994E",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    color: "#2C5F2D",
  },
  signupLink: {
    color: "#386641",
    fontWeight: "bold",
  },
});

export default SignUpPage;
