import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <NavigationContainer>
      {ui} 
    </NavigationContainer>
  );
}

export default renderWithProviders