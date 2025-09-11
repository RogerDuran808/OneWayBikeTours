import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Real site embedded */}
      <iframe
        src="https://biketours-aq3ybp.manus.space/#"
        title="One Way Bike Tours"
        className="w-full h-screen border-0"
        style={{ border: 'none' }}
      />

      {/* Chatbot overlay */}
      <ChatBot />
    </div>
  );
};

export default Index;
