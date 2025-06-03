import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateInterest = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanDuration);

    if (!principal || !annualRate || !years) {
      setTotalInterest('Please enter valid numbers');
      return;
    }

    const months = years * 12;
    const monthlyRate = annualRate / 12;

    const monthlyPayment =
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -months));

    const totalPaid = monthlyPayment * months;
    const interest = totalPaid - principal;

    setTotalInterest(`Total Interest: $${interest.toFixed(2)}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Loan Interest Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Loan Amount ($)"
        keyboardType="numeric"
        value={loanAmount}
        onChangeText={setLoanAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Interest Rate (%)"
        keyboardType="numeric"
        value={interestRate}
        onChangeText={setInterestRate}
      />
      <TextInput
        style={styles.input}
        placeholder="Loan Duration (Years)"
        keyboardType="numeric"
        value={loanDuration}
        onChangeText={setLoanDuration}
      />

      <Button title="Calculate" onPress={calculateInterest} />

      {totalInterest && (
        <Text style={styles.result}>{totalInterest}</Text>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1e293b',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  result: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
  },
});

