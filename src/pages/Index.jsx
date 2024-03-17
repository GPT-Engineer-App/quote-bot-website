import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button, VStack, Image, Spinner } from "@chakra-ui/react";
import { FaQuoteLeft, FaRedo } from "react-icons/fa";

const API_URL = "https://api.quotable.io/random";

const Index = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error(error);
      setQuote("Oops, something went wrong. Please try again.");
      setAuthor("");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" textAlign="center" p={4} bgGradient="linear(to-r, teal.400, blue.500)">
      <Box maxW="lg" borderWidth={1} borderRadius="lg" p={6} boxShadow="xl" bg="white">
        <Image src="https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxxdW90ZSUyMGljb258ZW58MHx8fHwxNzEwNjkxMTA0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Quote icon" boxSize="100px" mx="auto" mb={4} />
        <Heading as="h1" size="xl" mb={4}>
          Quote Bot
        </Heading>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <VStack spacing={4}>
            <Text fontSize="2xl">
              <FaQuoteLeft />
              {quote}
            </Text>
            <Text fontWeight="bold" fontStyle="italic">
              - {author}
            </Text>
          </VStack>
        )}
        <Button leftIcon={<FaRedo />} colorScheme="teal" variant="solid" mt={8} onClick={fetchQuote} isLoading={isLoading}>
          New Quote
        </Button>
      </Box>
    </Box>
  );
};

export default Index;
