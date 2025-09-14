import AIChatbot from '../AIChatbot';

export default function AIChatbotExample() {
  return (
    <div className="relative h-screen bg-background">
      <AIChatbot 
        isOpen={true}
        onToggle={() => console.log('Chatbot toggled')}
        isMinimized={false}
        onMinimizeToggle={() => console.log('Chatbot minimized')}
      />
    </div>
  );
}