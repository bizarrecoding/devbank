jest.mock('@react-native-vector-icons/fontawesome6', () => {
  const MockIcon = () => null; // Mock component
  return MockIcon;
});
