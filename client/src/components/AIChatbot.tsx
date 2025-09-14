
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Languages, 
  Bot,
  User,
  X,
  Minimize2,
  Maximize2
} from "lucide-react";
import farmerAvatar from "@assets/generated_images/Friendly_farmer_avatar_illustration_b7f49052.png";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  language?: string;
  translation?: string;
  originalContent?: string;
}

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  isMinimized: boolean;
  onMinimizeToggle: () => void;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
];

// Enhanced disease database with comprehensive information
const diseaseDatabase = {
  "tomato": {
    "late_blight": {
      symptoms: ["dark water-soaked spots", "white fungal growth", "brown lesions", "leaf yellowing"],
      treatment: "Apply copper-based fungicide like copper sulfate or copper hydroxide. Ensure good air circulation and avoid overhead watering.",
      prevention: "Use resistant varieties, practice crop rotation, maintain proper spacing between plants.",
      severity: "high"
    },
    "early_blight": {
      symptoms: ["circular brown spots", "target-like rings", "yellowing leaves", "defoliation"],
      treatment: "Spray with fungicides containing chlorothalonil or mancozeb. Remove affected leaves immediately.",
      prevention: "Avoid overhead irrigation, provide adequate spacing, use mulch to prevent soil splashing.",
      severity: "medium"
    },
    "bacterial_wilt": {
      symptoms: ["sudden wilting", "yellow leaves", "brown vascular tissue", "plant collapse"],
      treatment: "Remove infected plants immediately. Apply copper-based bactericide to surrounding plants.",
      prevention: "Use certified disease-free seeds, practice crop rotation, improve soil drainage.",
      severity: "high"
    }
  },
  "rice": {
    "blast": {
      symptoms: ["diamond-shaped lesions", "gray spots with brown borders", "leaf death", "panicle infection"],
      treatment: "Apply tricyclazole or carbendazim fungicide. Increase potassium fertilization.",
      prevention: "Use resistant varieties, avoid excessive nitrogen, maintain proper water management.",
      severity: "high"
    },
    "bacterial_leaf_blight": {
      symptoms: ["water-soaked lesions", "yellow halos", "leaf drying", "systemic infection"],
      treatment: "Spray copper-based bactericides. Apply streptomycin if available.",
      prevention: "Use resistant varieties, avoid injury to plants, manage water levels properly.",
      severity: "medium"
    }
  },
  "wheat": {
    "rust": {
      symptoms: ["orange pustules", "reddish-brown spots", "leaf yellowing", "reduced yield"],
      treatment: "Apply propiconazole or tebuconazole fungicide. Use systemic fungicides for severe infections.",
      prevention: "Plant rust-resistant varieties, avoid late sowing, maintain proper nutrition.",
      severity: "medium"
    },
    "powdery_mildew": {
      symptoms: ["white powdery growth", "leaf yellowing", "stunted growth", "reduced photosynthesis"],
      treatment: "Spray with sulfur-based fungicides or triadimefon. Ensure good air circulation.",
      prevention: "Plant resistant varieties, avoid overcrowding, maintain moderate moisture.",
      severity: "low"
    }
  }
};

// Enhanced translation database for all languages
const translations = {
  "en": {
    "greeting": "Hello! I'm your AI farming assistant. I can help you identify crop diseases, recommend treatments, and provide farming advice. What would you like to know?",
    "disease_identified": "Based on your description, this appears to be",
    "treatment_recommendation": "Treatment Recommendation:",
    "prevention_tips": "Prevention Tips:",
    "severity": "Severity Level:",
    "need_more_info": "Could you provide more details about the symptoms you're observing?",
    "crop_not_found": "I don't have specific information about that crop. Could you try with rice, wheat, or tomato?",
    "general_advice": "For healthy crops, ensure proper watering, adequate sunlight, balanced nutrition, and regular monitoring for pests and diseases.",
    "water_guidelines": "Watering Guidelines:",
    "fertilization_tips": "Fertilization Tips:",
    "pest_management": "Pest Management:"
  },
  "hi": {
    "greeting": "नमस्ते! मैं आपका AI कृषि सहायक हूं। मैं फसल रोगों की पहचान, उपचार सुझाने और कृषि सलाह प्रदान करने में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
    "disease_identified": "आपके वर्णन के आधार पर, यह प्रतीत होता है",
    "treatment_recommendation": "उपचार की सिफारिश:",
    "prevention_tips": "रोकथाम के उपाय:",
    "severity": "गंभीरता का स्तर:",
    "need_more_info": "क्या आप उन लक्षणों के बारे में और विवरण दे सकते हैं जो आप देख रहे हैं?",
    "crop_not_found": "मेरे पास उस फसल के बारे में विशिष्ट जानकारी नहीं है। क्या आप चावल, गेहूं या टमाटर के साथ कोशिश कर सकते हैं?",
    "general_advice": "स्वस्थ फसलों के लिए, उचित पानी देना, पर्याप्त धूप, संतुलित पोषण और कीटों और रोगों की नियमित निगरानी सुनिश्चित करें।",
    "water_guidelines": "पानी देने के दिशानिर्देश:",
    "fertilization_tips": "उर्वरक के सुझाव:",
    "pest_management": "कीट प्रबंधन:"
  },
  "ta": {
    "greeting": "வணக்கம்! நான் உங்களின் AI விவசாய உதவியாளர். பயிர் நோய்களைக் கண்டறிதல், சிகிச்சையைப் பரிந்துரைத்தல் மற்றும் விவசாய ஆலோசனை வழங்குதல் ஆகியவற்றில் உங்களுக்கு உதவ முடியும். நீங்கள் என்ன அறிய விரும்புகிறீர்கள்?",
    "disease_identified": "உங்கள் விளக்கத்தின் அடிப்படையில், இது தோன்றுகிறது",
    "treatment_recommendation": "சிகிச்சை பரிந்துரை:",
    "prevention_tips": "தடுப்பு குறிப்புகள்:",
    "severity": "தீவிரத்தன்மை நிலை:",
    "need_more_info": "நீங்கள் கவனிக்கும் அறிகுறிகள் பற்றி மேலும் விவரங்களை வழங்க முடியுமா?",
    "crop_not_found": "அந்த பயிரைப் பற்றி எனக்கு குறிப்பிட்ட தகவல் இல்லை। அரிசி, கோதுமை அல்லது தக்காளியுடன் முயற்சி செய்ய முடியுமா?",
    "general_advice": "ஆரோக்கியமான பயிர்களுக்கு, சரியான நீர்ப்பாசனம், போதுமான சூரிய ஒளி, சமச்சீர் ஊட்டம் மற்றும் பூச்சி மற்றும் நோய்களுக்கு வழக்கமான கண்காணிப்பை உறுதி செய்யுங்கள்।",
    "water_guidelines": "நீர் வழிகாட்டுதல்கள்:",
    "fertilization_tips": "உர குறிப்புகள்:",
    "pest_management": "பூச்சி மேலாண்மை:"
  },
  "te": {
    "greeting": "నమస్కారం! నేను మీ AI వ్యవసాయ సహాయకుడను. పంట వ్యాధులను గుర్తించడం, చికిత్సలను సిఫార్సు చేయడం మற్రియు వ్యవసాయ సలహాలు అందించడంలో మీకు సహాయపడగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
    "disease_identified": "మీ వివరణ ఆధారంగా, ఇది కనిపిస్తుంది",
    "treatment_recommendation": "చికిత్సా సిఫారసు:",
    "prevention_tips": "నివారణ చిట్కాలు:",
    "severity": "తీవ్రత స్థాయి:",
    "need_more_info": "మీరు గమనిస్తున్న లక్షణాల గురించి మరిన్ని వివరాలు అందించగలరా?",
    "crop_not_found": "ఆ పంట గురించి నాకు నిర్దిష్ట సమాచారం లేదు. వరి, గోధుమ లేదా టమోటాతో ప్రయత్నించగలరా?",
    "general_advice": "ఆరోగ్యకరమైన పంటల కోసం, సరైన నీటిపారుదల, తగిన సూర్యకాంతి, సమతుల్య పోషణ మరియు చీమలు మరియు వ్యాధుల కోసం క్రమం తప్పకుండా పర్యవేక్షణను నిర్ధారించండి।",
    "water_guidelines": "నీటి మార్గదర్శకాలు:",
    "fertilization_tips": "ఎరువుల చిట్కాలు:",
    "pest_management": "పురుగుల నిర్వహణ:"
  },
  "bn": {
    "greeting": "হ্যালো! আমি আপনার AI কৃষি সহায়ক। আমি ফসলের রোগ চিহ্নিতকরণ, চিকিৎসার সুপারিশ এবং কৃষি পরামর্শ প্রদানে আপনাকে সাহায্য করতে পারি। আপনি কী জানতে চান?",
    "disease_identified": "আপনার বর্ণনার উপর ভিত্তি করে, এটি মনে হচ্ছে",
    "treatment_recommendation": "চিকিৎসার সুপারিশ:",
    "prevention_tips": "প্রতিরোধের টিপস:",
    "severity": "গুরুত্বের স্তর:",
    "need_more_info": "আপনি যে লক্ষণগুলি পর্যবেক্ষণ করছেন সে সম্পর্কে আরও বিস্তারিত তথ্য দিতে পারেন?",
    "crop_not_found": "সেই ফসল সম্পর্কে আমার কাছে নির্দিষ্ট তথ্য নেই। ধান, গম বা টমেটো দিয়ে চেষ্টা করতে পারেন?",
    "general_advice": "সুস্থ ফসলের জন্য, সঠিক সেচ, পর্যাপ্ত সূর্যালোক, সুষম পুষ্টি এবং পোকামাকড় ও রোগের নিয়মিত নিরীক্ষণ নিশ্চিত করুন।",
    "water_guidelines": "পানির নির্দেশিকা:",
    "fertilization_tips": "সার প্রয়োগের টিপস:",
    "pest_management": "কীটপতঙ্গ ব্যবস্থাপনা:"
  },
  "mr": {
    "greeting": "नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. मी पिकांच्या रोगांची ओळख, उपचारांची शिफारस आणि शेतीविषयक सल्ला देण्यात तुम्हाला मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?",
    "disease_identified": "तुमच्या वर्णनावर आधारित, हे दिसते",
    "treatment_recommendation": "उपचाराची शिफारस:",
    "prevention_tips": "प्रतिबंधक टिप्स:",
    "severity": "तीव्रतेची पातळी:",
    "need_more_info": "तुम्ही पाहत असलेल्या लक्षणांबद्दल अधिक तपशील देऊ शकता का?",
    "crop_not_found": "माझ्याकडे त्या पिकाविषयी विशिष्ट माहिती नाही. तांदूळ, गहू किंवा टोमेटोसह प्रयत्न करू शकता का?",
    "general_advice": "निरोगी पिकांसाठी, योग्य पाणी, पुरेसा सूर्यप्रकाश, संतुलित पोषण आणि कीड आणि रोगांची नियमित तपासणी सुनिश्चित करा।",
    "water_guidelines": "पाण्याचे मार्गदर्शन:",
    "fertilization_tips": "खत वापराच्या टिप्स:",
    "pest_management": "कीड व्यवस्थापन:"
  },
  "pa": {
    "greeting": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਫਸਲ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦੀ ਪਛਾਣ, ਇਲਾਜ ਦੀ ਸਿਫਾਰਿਸ਼ ਅਤੇ ਖੇਤੀ ਸਲਾਹ ਪ੍ਰਦਾਨ ਕਰਨ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਤੁਸੀਂ ਕੀ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
    "disease_identified": "ਤੁਹਾਡੇ ਵਰਣਨ ਦੇ ਆਧਾਰ ਤੇ, ਇਹ ਲੱਗਦਾ ਹੈ",
    "treatment_recommendation": "ਇਲਾਜ ਦੀ ਸਿਫਾਰਿਸ਼:",
    "prevention_tips": "ਬਚਾਅ ਦੇ ਟਿੱਪਸ:",
    "severity": "ਗੰਭੀਰਤਾ ਦਾ ਪੱਧਰ:",
    "need_more_info": "ਕੀ ਤੁਸੀਂ ਉਨ੍ਹਾਂ ਲੱਛਣਾਂ ਬਾਰੇ ਹੋਰ ਵੇਰਵੇ ਦੇ ਸਕਦੇ ਹੋ ਜੋ ਤੁਸੀਂ ਦੇਖ ਰਹੇ ਹੋ?",
    "crop_not_found": "ਮੇਰੇ ਕੋਲ ਉਸ ਫਸਲ ਬਾਰੇ ਖਾਸ ਜਾਣਕਾਰੀ ਨਹੀਂ ਹੈ। ਕੀ ਤੁਸੀਂ ਚੌਲ, ਕਣਕ ਜਾਂ ਟਮਾਟਰ ਨਾਲ ਕੋਸ਼ਿਸ਼ ਕਰ ਸਕਦੇ ਹੋ?",
    "general_advice": "ਸਿਹਤਮੰਦ ਫਸਲਾਂ ਲਈ, ਸਹੀ ਪਾਣੀ, ਲੋੜੀਂਦਾ ਸੂਰਜ, ਸੰਤੁਲਿਤ ਪੋਸ਼ਣ ਅਤੇ ਕੀੜੇ ਅਤੇ ਬਿਮਾਰੀਆਂ ਦੀ ਨਿਯਮਿਤ ਨਿਗਰਾਨੀ ਯਕੀਨੀ ਬਣਾਓ।",
    "water_guidelines": "ਪਾਣੀ ਦੇ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼:",
    "fertilization_tips": "ਖਾਦ ਦੇ ਟਿੱਪਸ:",
    "pest_management": "ਕੀੜੇ ਪ੍ਰਬੰਧਨ:"
  },
  "kn": {
    "greeting": "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಬೆಳೆ ರೋಗಗಳ ಗುರುತಿಸುವಿಕೆ, ಚಿಕಿತ್ಸೆಯ ಶಿಫಾರಸುಗಳು ಮತ್ತು ಕೃಷಿ ಸಲಹೆ ನೀಡುವಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?",
    "disease_identified": "ನಿಮ್ಮ ವಿವರಣೆಯ ಆಧಾರದ ಮೇಲೆ, ಇದು ಕಾಣುತ್ತದೆ",
    "treatment_recommendation": "ಚಿಕಿತ್ಸೆಯ ಶಿಫಾರಸು:",
    "prevention_tips": "ತಡೆಗಟ್ಟುವ ಸಲಹೆಗಳು:",
    "severity": "ತೀವ್ರತೆಯ ಮಟ್ಟ:",
    "need_more_info": "ನೀವು ಗಮನಿಸುತ್ತಿರುವ ಲಕ್ಷಣಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ನೀಡಬಹುದೇ?",
    "crop_not_found": "ಆ ಬೆಳೆಯ ಬಗ್ಗೆ ನನಗೆ ನಿರ್ದಿಷ್ಟ ಮಾಹಿತಿ ಇಲ್ಲ. ಅಕ್ಕಿ, ಗೋಧಿ ಅಥವಾ ಟೊಮೆಟೊದೊಂದಿಗೆ ಪ್ರಯತ್ನಿಸಬಹುದೇ?",
    "general_advice": "ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳಿಗಾಗಿ, ಸರಿಯಾದ ನೀರಾವರಿ, ಸಾಕಷ್ಟು ಸೂರ್ಯಕಾಂತಿ, ಸಮತೋಲಿತ ಪೋಷಣೆ ಮತ್ತು ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳಿಗೆ ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ।",
    "water_guidelines": "ನೀರಾವರಿ ಮಾರ್ಗಸೂಚಿಗಳು:",
    "fertilization_tips": "ಗೊಬ್ಬರ ಸಲಹೆಗಳು:",
    "pest_management": "ಕೀಟ ನಿರ್ವಹಣೆ:"
  },
  "gu": {
    "greeting": "નમસ્તે! હું તમારો AI કૃષિ સહાયક છું. હું પાકના રોગોની ઓળખ, સારવારની ભલામણો અને કૃષિ સલાહ આપવામાં તમારી સહાય કરી શકું છું. તમે શું જાણવા માંગો છો?",
    "disease_identified": "તમારા વર્ણનના આધારે, આ લાગે છે",
    "treatment_recommendation": "સારવારની ભલામણ:",
    "prevention_tips": "નિવારણ ટિપ્સ:",
    "severity": "ગંભીરતાનું સ્તર:",
    "need_more_info": "તમે જે લક્ષણો જોઈ રહ્યા છો તેના વિશે વધુ વિગતો આપી શકો છો?",
    "crop_not_found": "મારી પાસે તે પાક વિશે વિશિષ્ટ માહિતી નથી. શકો તો ચોખા, ઘઉં અથવા ટામેટા સાથે પ્રયાસ કરો?",
    "general_advice": "સ્વસ્થ પાક માટે, યોગ્ય પાણી, પૂરતો સૂર્યપ્રકાશ, સંતુલિત પોષણ અને કીડા અને રોગોની નિયમિત દેખરેખ સુનિશ્ચિત કરો।",
    "water_guidelines": "પાણીની માર્ગદર્શિકા:",
    "fertilization_tips": "ખાતરની ટિપ્સ:",
    "pest_management": "કીટ વ્યવસ્થાપન:"
  },
  "ml": {
    "greeting": "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കൃഷി സഹായിയാണ്. വിള രോഗങ്ങൾ തിരിച്ചറിയൽ, ചികിത്സാ ശുപാർശകൾ, കൃഷി ഉപദേശം എന്നിവയിൽ നിങ്ങളെ സഹായിക്കാൻ എനിക്ക് കഴിയും. നിങ്ങൾ എന്താണ് അറിയാൻ ആഗ്രഹിക്കുന്നത്?",
    "disease_identified": "നിങ്ങളുടെ വിവരണത്തിന്റെ അടിസ്ഥാനത്തിൽ, ഇത് കാണപ്പെടുന്നു",
    "treatment_recommendation": "ചികിത്സാ ശുപാർശ:",
    "prevention_tips": "പ്രതിരോധ നുറുങ്ങുകൾ:",
    "severity": "ഗുരുത്വാകർഷണ നില:",
    "need_more_info": "നിങ്ങൾ നിരീക്ഷിക്കുന്ന ലക്ഷണങ്ങളെക്കുറിച്ച് കൂടുതൽ വിവരങ്ങൾ നൽകാമോ?",
    "crop_not_found": "ആ വിളയെക്കുറിച്ച് എനിക്ക് നിർദ്ദിഷ്ട വിവരങ്ങളില്ല. നെല്ല്, ഗോതമ്പ് അല്ലെങ്കിൽ തക്കാളി ഉപയോഗിച്ച് ശ്രമിക്കാമോ?",
    "general_advice": "ആരോഗ്യകരമായ വിളകൾക്കായി, ശരിയായ നനവ്, മതിയായ സൂര്യപ്രകാശം, സമതുലിതമായ പോഷണം, കീടങ്ങൾക്കും രോഗങ്ങൾക്കും സ്ഥിരമായ നിരീക്ഷണം എന്നിവ ഉറപ്പാക്കുക।",
    "water_guidelines": "ജല മാർഗ്ഗനിർദ്ദേശങ്ങൾ:",
    "fertilization_tips": "വളപ്രയോഗ നുറുങ്ങുകൾ:",
    "pest_management": "കീട നിയന്ത്രണം:"
  }
};

export default function AIChatbot({ isOpen, onToggle, isMinimized, onMinimizeToggle }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const speechSynth = window.speechSynthesis;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = selectedLanguage === 'en' ? 'en-US' : 
                          selectedLanguage === 'hi' ? 'hi-IN' : 
                          selectedLanguage === 'ta' ? 'ta-IN' : 
                          selectedLanguage === 'te' ? 'te-IN' : 
                          selectedLanguage === 'bn' ? 'bn-BD' : 
                          selectedLanguage === 'mr' ? 'mr-IN' : 
                          selectedLanguage === 'pa' ? 'pa-IN' : 
                          selectedLanguage === 'kn' ? 'kn-IN' : 
                          selectedLanguage === 'gu' ? 'gu-IN' : 
                          selectedLanguage === 'ml' ? 'ml-IN' : 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setNewMessage(transcript);
          setIsListening(false);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        setSpeechRecognition(recognition);
      }
      
      setSpeechSynthesis(speechSynth);
    }
  }, [selectedLanguage]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "1",
        content: translations[selectedLanguage]?.greeting || translations.en.greeting,
        sender: "bot",
        timestamp: new Date(),
        language: selectedLanguage
      }]);
    }
  }, [selectedLanguage, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI response generation with comprehensive question handling
  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const lang = translations[selectedLanguage] || translations.en;

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('namaste') || 
        message.includes('good morning') || message.includes('good evening') || message.includes('hey')) {
      return lang.greeting;
    }

    // Weather-related questions
    if (message.includes('weather') || message.includes('rain') || message.includes('temperature') || 
        message.includes('climate') || message.includes('season')) {
      return `**Weather & Climate Information** 🌤️

For optimal crop growth, consider these weather factors:
- **Temperature**: Most crops prefer 20-30°C during growing season
- **Rainfall**: Adequate water supply is crucial (varies by crop)
- **Humidity**: High humidity can promote fungal diseases
- **Sunlight**: 6-8 hours of direct sunlight daily is ideal

**Weather-based farming tips:**
- Monitor weather forecasts for irrigation planning
- Protect crops during extreme weather events
- Adjust planting schedules based on seasonal patterns
- Use weather data for pest and disease prediction

Would you like specific weather recommendations for a particular crop?`;
    }

    // Soil-related questions
    if (message.includes('soil') || message.includes('ph') || message.includes('fertility') || 
        message.includes('nutrients') || message.includes('compost')) {
      return `**Soil Health & Management** 🌱

Healthy soil is the foundation of successful farming:

**Soil Testing:**
- Test pH levels (6.0-7.5 ideal for most crops)
- Check nutrient levels (N-P-K)
- Assess organic matter content
- Monitor soil texture and drainage

**Soil Improvement:**
- Add organic compost regularly
- Practice crop rotation
- Use cover crops to prevent erosion
- Avoid over-tillage

**Common Soil Issues:**
- **Acidic soil**: Add lime to raise pH
- **Alkaline soil**: Add sulfur or organic matter
- **Compacted soil**: Use deep tillage and add organic matter
- **Poor drainage**: Create raised beds or add sand

What specific soil concern do you have?`;
    }

    // Crop-specific disease detection and treatment
    for (const crop in diseaseDatabase) {
      if (message.includes(crop)) {
        // Check for specific disease symptoms
        for (const disease in diseaseDatabase[crop]) {
          const diseaseInfo = diseaseDatabase[crop][disease];
          const symptoms = diseaseInfo.symptoms;
          
          // Enhanced symptom matching
          const matchedSymptoms = symptoms.filter(symptom => {
            const symptomWords = symptom.toLowerCase().split(' ');
            return symptomWords.some(word => message.includes(word)) ||
                   message.includes(symptom.toLowerCase());
          });

          if (matchedSymptoms.length > 0 || message.includes(disease.replace('_', ' '))) {
            const severityEmoji = diseaseInfo.severity === 'high' ? '🔴' : 
                                diseaseInfo.severity === 'medium' ? '🟡' : '🟢';
            
            return `${lang.disease_identified} **${disease.replace(/_/g, ' ').toUpperCase()} in ${crop.toUpperCase()}** ${severityEmoji}

**${lang.treatment_recommendation}**
${diseaseInfo.treatment}

**${lang.prevention_tips}**
${diseaseInfo.prevention}

**${lang.severity}** ${diseaseInfo.severity.toUpperCase()}

**Immediate Actions:**
1. Isolate affected plants if possible
2. Remove and dispose of infected plant material
3. Apply recommended treatment immediately
4. Monitor surrounding plants closely

Need more specific guidance or have questions about application methods?`;
          }
        }

        // General crop information when no specific disease is detected
        const cropAdvice = {
          tomato: `**Tomato Cultivation Guide** 🍅
- **Planting**: Warm season crop, plant after last frost
- **Watering**: Deep, consistent watering at soil level
- **Support**: Use stakes or cages for vine support
- **Common issues**: Blight, wilt, blossom end rot
- **Harvest**: Pick when fruits are firm and fully colored`,
          
          rice: `**Rice Cultivation Guide** 🌾
- **Planting**: Requires flooded fields or consistent moisture
- **Varieties**: Choose based on local climate and market demand
- **Water management**: Maintain 2-5cm water depth in paddy
- **Common issues**: Blast, bacterial blight, stem borer
- **Harvest**: When grains are golden and firm`,
          
          wheat: `**Wheat Cultivation Guide** 🌾
- **Planting**: Cool season crop, plant in fall or early spring
- **Soil**: Well-drained, fertile soil with pH 6.0-7.5
- **Fertilization**: High nitrogen requirement, split applications
- **Common issues**: Rust, powdery mildew, aphids
- **Harvest**: When grain moisture is 12-14%`
        };

        return cropAdvice[crop] || `**${crop.toUpperCase()} Information**

I can help you with ${crop} cultivation. Please specify what you'd like to know:
- Disease identification and treatment
- Planting and care instructions
- Pest management
- Harvesting guidelines
- Nutrition requirements

What specific aspect of ${crop} farming interests you?`;
      }
    }

    // Fertilizer and nutrition questions
    if (message.includes('fertilizer') || message.includes('nutrition') || message.includes('npk') || 
        message.includes('nitrogen') || message.includes('phosphorus') || message.includes('potassium')) {
      return `**${lang.fertilization_tips}** 🌿

**Essential Nutrients (NPK):**
- **Nitrogen (N)**: Promotes leaf growth and green color
- **Phosphorus (P)**: Supports root development and flowering
- **Potassium (K)**: Improves disease resistance and fruit quality

**Application Guidelines:**
- **Soil test first** to determine exact needs
- **Organic options**: Compost, manure, bone meal, kelp meal
- **Chemical fertilizers**: Use balanced ratios (10-10-10 for general use)
- **Timing**: Apply during active growing season
- **Method**: Work into soil, don't just surface apply

**Signs of Deficiency:**
- **Nitrogen**: Yellow leaves, stunted growth
- **Phosphorus**: Purple leaves, poor root development
- **Potassium**: Brown leaf edges, weak stems

Which specific nutrient concern do you have, or what crop are you fertilizing?`;
    }

    // Watering and irrigation questions
    if (message.includes('water') || message.includes('irrigation') || message.includes('watering') || 
        message.includes('drought') || message.includes('moisture')) {
      return `**${lang.water_guidelines}** 💧

**Optimal Watering Practices:**
- **Timing**: Early morning (6-10 AM) is best
- **Method**: Water at soil level to reduce disease
- **Frequency**: Deep, less frequent watering is better than shallow, frequent watering
- **Amount**: 1-2 inches per week for most crops

**Water Management by Crop Type:**
- **Leafy greens**: Light, frequent watering
- **Root vegetables**: Consistent moisture, avoid waterlogging
- **Fruit crops**: Deep watering, reduce before harvest

**Signs of Water Stress:**
- **Over-watering**: Yellow leaves, root rot, fungal growth
- **Under-watering**: Wilting, dry soil, stunted growth

**Water Conservation:**
- Use mulch to retain moisture
- Install drip irrigation systems
- Collect rainwater for irrigation
- Choose drought-resistant varieties

What's your specific watering challenge?`;
    }

    // Pest management questions
    if (message.includes('pest') || message.includes('insect') || message.includes('bug') || 
        message.includes('aphid') || message.includes('caterpillar') || message.includes('beetle')) {
      return `**${lang.pest_management}** 🐛

**Integrated Pest Management (IPM) Approach:**

**1. Prevention:**
- Crop rotation to break pest cycles
- Companion planting (marigolds, basil, mint)
- Healthy soil creates strong, resistant plants
- Regular inspection for early detection

**2. Biological Control:**
- Encourage beneficial insects (ladybugs, lacewings)
- Use beneficial nematodes for soil pests
- Install bird houses for natural predation

**3. Organic Treatments:**
- **Neem oil**: Effective against aphids, mites, whiteflies
- **Diatomaceous earth**: Controls crawling insects
- **Soap spray**: Mix 1 tbsp dish soap per quart water
- **Bt (Bacillus thuringiensis)**: For caterpillars

**4. Chemical Control (last resort):**
- Use only when threshold levels are reached
- Rotate different modes of action
- Follow label instructions carefully
- Apply during calm weather conditions

**Common Pests & Solutions:**
- **Aphids**: Soap spray, ladybugs, neem oil
- **Caterpillars**: Bt spray, hand picking
- **Spider mites**: Increase humidity, predatory mites

What specific pest are you dealing with?`;
    }

    // Harvest and post-harvest questions
    if (message.includes('harvest') || message.includes('when to pick') || message.includes('ripe') || 
        message.includes('storage') || message.includes('post harvest')) {
      return `**Harvest & Post-Harvest Management** 📦

**Harvest Timing Indicators:**
- **Fruits**: Color change, slight softness, easy separation from stem
- **Vegetables**: Size, color, firmness specific to variety
- **Grains**: Moisture content, color change, test harvest small area

**Harvest Best Practices:**
- **Time of day**: Early morning when temperatures are cool
- **Tools**: Use clean, sharp tools to prevent disease transmission
- **Handling**: Gentle handling to prevent bruising
- **Containers**: Use clean, ventilated containers

**Post-Harvest Storage:**
- **Temperature control**: Most produce requires cool temperatures
- **Humidity**: Optimal levels vary by crop type
- **Ventilation**: Prevent moisture buildup and ethylene accumulation
- **Separation**: Keep ethylene producers away from sensitive crops

**Storage Methods:**
- **Short-term**: Refrigeration, proper containers
- **Long-term**: Freezing, drying, canning, fermentation
- **Root cellars**: For root vegetables and some fruits

**Quality Maintenance:**
- Handle minimally to reduce damage
- Sort and remove damaged items
- Monitor storage conditions regularly

What crop are you planning to harvest?`;
    }

    // Organic farming questions
    if (message.includes('organic') || message.includes('natural') || message.includes('chemical free') || 
        message.includes('sustainable')) {
      return `**Organic Farming Practices** 🌿

**Core Principles:**
- Soil health through organic matter
- Biodiversity and ecosystem balance
- Natural pest and disease management
- No synthetic chemicals or GMOs

**Soil Building:**
- Compost and aged manure
- Cover crops and green manures
- Minimal tillage practices
- Crop rotation for nutrient cycling

**Natural Pest Control:**
- Beneficial insect habitats
- Companion planting strategies
- Physical barriers and traps
- Organic-approved sprays (neem, soap, Bt)

**Disease Prevention:**
- Disease-resistant varieties
- Proper plant spacing for air circulation
- Crop rotation to break disease cycles
- Organic fungicides (copper, sulfur)

**Certification Requirements:**
- 3-year transition period from conventional
- Detailed record keeping
- Annual inspections
- Approved input materials only

**Benefits:**
- Improved soil health over time
- Reduced environmental impact
- Premium market prices
- Enhanced biodiversity

Would you like specific guidance on transitioning to organic methods?`;
    }

    // Crop rotation questions
    if (message.includes('rotation') || message.includes('crop rotation') || message.includes('succession')) {
      return `**Crop Rotation Benefits & Strategies** 🔄

**Why Rotate Crops:**
- Prevents soil nutrient depletion
- Breaks pest and disease cycles
- Improves soil structure
- Reduces weed pressure
- Increases biodiversity

**Basic Rotation Principles:**
- **4-year minimum** rotation cycle
- **Different plant families** in sequence
- **Heavy feeders → Light feeders → Soil builders**
- Avoid planting same family in consecutive years

**Crop Categories:**
- **Heavy feeders**: Tomatoes, corn, cabbage, squash
- **Light feeders**: Herbs, lettuce, onions, carrots
- **Soil builders**: Legumes (beans, peas, clover)

**Sample 4-Year Rotation:**
1. **Year 1**: Heavy feeders (tomatoes, peppers, corn)
2. **Year 2**: Legumes (beans, peas) - fix nitrogen
3. **Year 3**: Root crops (carrots, beets, radishes)
4. **Year 4**: Brassicas (cabbage, broccoli, kale)

**Planning Tips:**
- Map your garden/fields by zones
- Keep detailed records of what was planted where
- Consider companion planting within rotation
- Plan for cover crops during off-season

Do you need help planning a rotation for specific crops?`;
    }

    // Market and economic questions
    if (message.includes('price') || message.includes('market') || message.includes('sell') || 
        message.includes('profit') || message.includes('economics')) {
      return `**Agricultural Economics & Marketing** 💰

**Market Research:**
- Study local demand and pricing trends
- Identify high-value crop opportunities
- Consider processing and value-addition
- Explore direct-to-consumer sales

**Cost Analysis:**
- Calculate input costs (seeds, fertilizers, labor)
- Factor in equipment and infrastructure
- Include post-harvest and marketing costs
- Plan for crop insurance and risk management

**Marketing Strategies:**
- **Direct sales**: Farmers markets, CSA, farm stands
- **Wholesale**: Restaurants, grocery stores, distributors
- **Online sales**: E-commerce platforms, social media
- **Value-added products**: Processing, packaging, branding

**Profit Maximization:**
- Focus on high-value crops suitable for your region
- Reduce input costs through efficient practices
- Minimize post-harvest losses
- Build customer relationships for repeat business

**Record Keeping:**
- Track production costs and yields
- Monitor market prices and trends
- Document best practices and lessons learned
- Maintain financial records for tax purposes

What specific aspect of farm economics interests you?`;
    }

    // Technology and modern farming
    if (message.includes('technology') || message.includes('sensors') || message.includes('automation') || 
        message.includes('precision farming') || message.includes('drones')) {
      return `**Modern Agricultural Technology** 🚀

**Precision Agriculture Tools:**
- **GPS guidance**: Accurate field operations, reduced overlap
- **Variable rate technology**: Optimize inputs based on field conditions
- **Yield mapping**: Track productivity across fields
- **Soil sampling**: Grid-based nutrient analysis

**Smart Monitoring Systems:**
- **Weather stations**: Real-time climate data
- **Soil sensors**: Moisture, temperature, pH monitoring
- **Plant health sensors**: Early stress detection
- **Irrigation automation**: Water management systems

**Drone Applications:**
- **Crop monitoring**: Health assessment, growth tracking
- **Spray applications**: Targeted pesticide/fertilizer delivery
- **Mapping**: Field boundaries, problem area identification
- **Livestock monitoring**: Herd health and location tracking

**Data Management:**
- **Farm management software**: Planning, record keeping, analysis
- **Mobile apps**: Field data collection, decision support
- **Cloud storage**: Access data anywhere, backup protection
- **Analytics**: Predictive modeling, optimization recommendations

**Benefits:**
- Increased efficiency and productivity
- Reduced input costs and environmental impact
- Better decision making with data insights
- Improved crop quality and yields

Which agricultural technology are you most interested in implementing?`;
    }

    // Default response for unmatched queries
    return `I understand you're asking about farming, but I need more specific information to provide the best help.

**I can assist you with:**
🌱 **Crop Diseases**: Identification, treatment, prevention
💧 **Water Management**: Irrigation, drainage, water conservation  
🌾 **Crop Guidance**: Planting, care, harvesting for rice, wheat, tomato
🐛 **Pest Control**: Organic and conventional pest management
🌿 **Soil Health**: Testing, fertilization, improvement methods
📈 **Farm Economics**: Marketing, profitability, cost analysis
🚀 **Technology**: Modern farming tools and techniques

**Please try asking:**
- "How do I treat tomato blight?"
- "When should I water my crops?"
- "What fertilizer is best for wheat?"
- "How do I control aphids naturally?"
- "Tell me about crop rotation"

What specific farming challenge can I help you solve today?`;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Generate intelligent AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "bot",
        timestamp: new Date(),
        language: selectedLanguage
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!speechRecognition) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      console.log('Voice input started');
      speechRecognition.start();
      setIsListening(true);
    }
  };

  const handleTextToSpeech = (message: string) => {
    if (!speechSynthesis) {
      alert('Speech synthesis is not supported in your browser');
      return;
    }

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(message);
      
      // Set language for speech synthesis
      const voiceLang = selectedLanguage === 'en' ? 'en-US' : 
                       selectedLanguage === 'hi' ? 'hi-IN' : 
                       selectedLanguage === 'ta' ? 'ta-IN' : 
                       selectedLanguage === 'te' ? 'te-IN' : 
                       selectedLanguage === 'bn' ? 'bn-BD' : 
                       selectedLanguage === 'mr' ? 'mr-IN' : 
                       selectedLanguage === 'pa' ? 'pa-IN' : 
                       selectedLanguage === 'kn' ? 'kn-IN' : 
                       selectedLanguage === 'gu' ? 'gu-IN' : 
                       selectedLanguage === 'ml' ? 'ml-IN' : 'en-US';
      
      utterance.lang = voiceLang;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const translateMessage = async (message: Message) => {
    console.log('Translate:', message.content);
    
    // If already translated, show original content
    if (message.translation && message.originalContent) {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, translation: undefined, originalContent: undefined }
          : msg
      ));
      return;
    }

    // Comprehensive translation database for agricultural content
    const agriculturalTranslations = {
      // Common phrases and greetings
      "Hello! I'm your AI farming assistant. I can help you identify crop diseases, recommend treatments, and provide farming advice. What would you like to know?": {
        "hi": "नमस्ते! मैं आपका AI कृषि सहायक हूं। मैं फसल रोगों की पहचान, उपचार सुझाने और कृषि सलाह प्रदान करने में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
        "ta": "வணக்கம்! நான் உங்களின் AI விவசாய உதவியாளர். பயிர் நோய்களைக் கண்டறிதல், சிகிச்சையைப் பரிந்துரைத்தல் மற்றும் விவசாய ஆலோசனை வழங்குதல் ஆகியவற்றில் உங்களுக்கு உதவ முடியும். நீங்கள் என்ன அறிய விரும்புகிறீர்கள்?",
        "te": "నమస్కారం! నేను మీ AI వ్యవసాయ సహాయకుడను। పంట వ్యాధులను గుర్తించడం, చికిత్సలను సిఫార్సు చేయడం మరియు వ్యవసాయ సలహాలు అందించడంలో మీకు సహాయపడగలను। మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
        "bn": "হ্যালো! আমি আপনার AI কৃষি সহায়ক। আমি ফসলের রোগ চিহ্নিতকরণ, চিকিৎসার সুপারিশ এবং কৃষি পরামর্শ প্রদানে আপনাকে সাহায্য করতে পারি। আপনি কী জানতে চান?",
        "mr": "नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. मी पिकांच्या रोगांची ओळख, उपचारांची शिफारस आणि शेतीविषयक सल्ला देण्यात तुम्हाला मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?",
        "pa": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਫਸਲ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦੀ ਪਛਾਣ, ਇਲਾਜ ਦੀ ਸਿਫਾਰਿਸ਼ ਅਤੇ ਖੇਤੀ ਸਲਾਹ ਪ੍ਰਦਾਨ ਕਰਨ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਤੁਸੀਂ ਕੀ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
        "kn": "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಬೆಳೆ ರೋಗಗಳ ಗುರುತಿಸುವಿಕೆ, ಚಿಕಿತ್ಸೆಯ ಶಿಫಾರಸುಗಳು ಮತ್ತು ಕೃಷಿ ಸಲಹೆ ನೀಡುವಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ। ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?",
        "gu": "નમસ્તે! હું તમારો AI કૃષિ સહાયક છું. હું પાકના રોગોની ઓળખ, સારવારની ભલામણો અને કૃષિ સલાહ આપવામાં તમારી સહાય કરી શકું છું. તમે શું જાણવા માંગો છો?",
        "ml": "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കൃഷി സഹായിയാണ്. വിള രോഗങ്ങൾ തിരിച്ചറിയൽ, ചികിത്സാ ശുപാർശകൾ, കൃഷി ഉപദേശം എന്നിവയിൽ നിങ്ങളെ സഹായിക്കാൻ എനിക്ക് കഴിയും. നിങ്ങൾ എന്താണ് അറിയാൻ ആഗ്രഹിക്കുന്നത്?"
      },
      
      // Agricultural terms translations
      "crop": { "hi": "फसल", "ta": "பயிர்", "te": "పంట", "bn": "ফসল", "mr": "पीक", "pa": "ਫਸਲ", "kn": "ಬೆಳೆ", "gu": "પાક", "ml": "വിള" },
      "disease": { "hi": "रोग", "ta": "நோய்", "te": "వ్యాధి", "bn": "রোগ", "mr": "रोग", "pa": "ਬਿਮਾਰੀ", "kn": "ರೋಗ", "gu": "રોગ", "ml": "രോഗം" },
      "treatment": { "hi": "उपचार", "ta": "சிகிச்சை", "te": "చికిత్స", "bn": "চিকিৎসা", "mr": "उपचार", "pa": "ਇਲਾਜ", "kn": "ಚಿಕಿತ್ಸೆ", "gu": "સારવાર", "ml": "ചികിത്സ" },
      "prevention": { "hi": "रोकथाम", "ta": "தடுப்பு", "te": "నివారణ", "bn": "প্রতিরোধ", "mr": "प्रतिबंध", "pa": "ਬਚਾਅ", "kn": "ತಡೆಗಟ್ಟುವಿಕೆ", "gu": "નિવારણ", "ml": "പ്രതിരോധം" },
      "fertilizer": { "hi": "उर्वरक", "ta": "உரம்", "te": "ఎరువులు", "bn": "সার", "mr": "खत", "pa": "ਖਾਦ", "kn": "ಗೊಬ್ಬರ", "gu": "ખાતર", "ml": "വളം" },
      "water": { "hi": "पानी", "ta": "நீர்", "te": "నీరు", "bn": "পানি", "mr": "पाणी", "pa": "ਪਾਣੀ", "kn": "ನೀರು", "gu": "પાણી", "ml": "വെള്ളം" },
      "soil": { "hi": "मिट्टी", "ta": "மண்", "te": "నేల", "bn": "মাটি", "mr": "माती", "pa": "ਮਿੱਟੀ", "kn": "ಮಣ್ಣು", "gu": "માટી", "ml": "മണ്ണ്" }
    };

    let translatedContent = message.content;

    // Check for exact message matches first
    const exactMatch = agriculturalTranslations[message.content];
    if (exactMatch && exactMatch[selectedLanguage]) {
      translatedContent = exactMatch[selectedLanguage];
    } else {
      // Translate individual agricultural terms within the message
      let workingContent = message.content;
      
      Object.entries(agriculturalTranslations).forEach(([englishTerm, translations]) => {
        if (typeof translations === 'object' && translations[selectedLanguage]) {
          // Create case-insensitive regex for whole words
          const regex = new RegExp(`\\b${englishTerm}\\b`, 'gi');
          workingContent = workingContent.replace(regex, translations[selectedLanguage]);
        }
      });

      // If content was changed, use the translated version
      if (workingContent !== message.content) {
        translatedContent = workingContent;
      } else {
        // Use common translations for basic responses
        const lang = translations[selectedLanguage] || translations.en;
        
        // Check if it's a common response type and translate accordingly
        if (message.content.includes('Weather & Climate Information') || message.content.includes('weather')) {
          translatedContent = `**${selectedLanguage === 'hi' ? 'मौसम और जलवायु की जानकारी' : 
                                    selectedLanguage === 'ta' ? 'வானிலை மற்றும் காலநிலை தகவல்' :
                                    selectedLanguage === 'te' ? 'వాతావరణం మరియు వాతావరణ సమాచారం' :
                                    selectedLanguage === 'bn' ? 'আবহাওয়া ও জলবায়ু তথ্য' :
                                    selectedLanguage === 'mr' ? 'हवामान आणि हवामान माहिती' :
                                    selectedLanguage === 'pa' ? 'ਮੌਸਮ ਅਤੇ ਜਲਵਾਯੂ ਦੀ ਜਾਣਕਾਰੀ' :
                                    selectedLanguage === 'kn' ? 'ಹವಾಮಾನ ಮತ್ತು ಹವಾಮಾನ ಮಾಹಿತಿ' :
                                    selectedLanguage === 'gu' ? 'હવામાન અને આબોહવા માહિતી' :
                                    selectedLanguage === 'ml' ? 'കാലാവസ്ഥയും കാലാവസ്ഥാ വിവരങ്ങളും' :
                                    'Weather & Climate Information'}** 🌤️\n\n` + 
                             (selectedLanguage === 'hi' ? 'इष्टतम फसल विकास के लिए, इन मौसम कारकों पर विचार करें...' :
                              selectedLanguage === 'ta' ? 'உகந்த பயிர் வளர்ச்சிக்கு, இந்த வானிலை காரணிகளை கருத்தில் கொள்ளுங்கள்...' :
                              selectedLanguage === 'te' ? 'సరైన పంట వృద్ధి కోసం, ఈ వాతావరణ కారకాలను పరిశీలించండి...' :
                              selectedLanguage === 'bn' ? 'সর্বোত্তম শস্য বৃদ্ধির জন্য, এই আবহাওয়া কারণগুলি বিবেচনা করুন...' :
                              selectedLanguage === 'mr' ? 'इष्टतम पीक वाढीसाठी, या हवामान घटकांचा विचार करा...' :
                              selectedLanguage === 'pa' ? 'ਸਰਵੋਤਮ ਫਸਲ ਵਿਕਾਸ ਲਈ, ਇਨ੍ਹਾਂ ਮੌਸਮ ਕਾਰਕਾਂ ਤੇ ਵਿਚਾਰ ਕਰੋ...' :
                              selectedLanguage === 'kn' ? 'ಅತ್ಯುತ್ತಮ ಬೆಳೆ ಬೆಳವಣಿಗೆಗಾಗಿ, ಈ ಹವಾಮಾನ ಅಂಶಗಳನ್ನು ಪರಿಗಣಿಸಿ...' :
                              selectedLanguage === 'gu' ? 'આદર્શ પાક વૃદ્ધિ માટે, આ હવામાન પરિબળોનો વિચાર કરો...' :
                              selectedLanguage === 'ml' ? 'ഉത്തമ വിള വളർച്ചയ്ക്കായി, ഈ കാലാവസ്ഥാ ഘടകങ്ങൾ പരിഗണിക്കുക...' :
                              'For optimal crop growth, consider these weather factors...');
        } else if (message.content.includes('Soil Health') || message.content.includes('soil')) {
          translatedContent = `**${selectedLanguage === 'hi' ? 'मृदा स्वास्थ्य और प्रबंधन' :
                                    selectedLanguage === 'ta' ? 'மண் ஆரோக்கியம் மற்றும் மேலாண்மை' :
                                    selectedLanguage === 'te' ? 'నేల ఆరోగ్యం మరియు నిర్వహణ' :
                                    selectedLanguage === 'bn' ? 'মাটির স্বাস্থ্য ও ব্যবস্থাপনা' :
                                    selectedLanguage === 'mr' ? 'माती आरोग्य आणि व्यवस्थापन' :
                                    selectedLanguage === 'pa' ? 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਅਤੇ ਪ੍ਰਬੰਧਨ' :
                                    selectedLanguage === 'kn' ? 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ನಿರ್ವಹಣೆ' :
                                    selectedLanguage === 'gu' ? 'માટીની આરોગ્ય અને વ્યવસ્થાપન' :
                                    selectedLanguage === 'ml' ? 'മണ്ണിന്റെ ആരോഗ്യവും പരിപാലനവും' :
                                    'Soil Health & Management'}** 🌱\n\n` +
                             (selectedLanguage === 'hi' ? 'स्वस्थ मिट्टी सफल खेती की नींव है...' :
                              selectedLanguage === 'ta' ? 'ஆரோக்கியமான மண் வெற்றிகரமான விவசாயத்தின் அடித்தளம்...' :
                              selectedLanguage === 'te' ? 'ఆరోగ్యకరమైన మట్టి విజయవంతమైన వ్యవసాయానికి పునాది...' :
                              selectedLanguage === 'bn' ? 'স্বাস্থ্যকর মাটি সফল কৃষিকাজের ভিত্তি...' :
                              selectedLanguage === 'mr' ? 'निरोगी माती यशस्वी शेतीचा पाया आहे...' :
                              selectedLanguage === 'pa' ? 'ਸਿਹਤਮੰਦ ਮਿੱਟੀ ਸਫਲ ਖੇਤੀ ਦਾ ਆਧਾਰ ਹੈ...' :
                              selectedLanguage === 'kn' ? 'ಆರೋಗ್ಯಕರ ಮಣ್ಣು ಯಶಸ್ವಿ ಕೃಷಿಯ ಅಡಿಪಾಯ...' :
                              selectedLanguage === 'gu' ? 'તંદુરસ્ત માટી સફળ ખેતીનો આધાર છે...' :
                              selectedLanguage === 'ml' ? 'ആരോഗ്യകരമായ മണ്ണ് വിജയകരമായ കൃഷിയുടെ അടിത്തറ...' :
                              'Healthy soil is the foundation of successful farming...');
        } else {
          // Keep the original content if no specific translation is available
          translatedContent = message.content;
        }
      }
    }

    // Update the message with translation
    setMessages(prev => prev.map(msg => 
      msg.id === message.id 
        ? { ...msg, translation: translatedContent, originalContent: msg.content }
        : msg
    ));
  };

  // Update messages when language changes
  useEffect(() => {
    setMessages(prev => prev.map(msg => {
      if (msg.sender === 'bot') {
        const lang = translations[selectedLanguage] || translations.en;
        if (msg.id === "1") {
          return { ...msg, content: lang.greeting };
        }
      }
      return msg;
    }));
  }, [selectedLanguage]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          size="lg"
          className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg"
          data-testid="button-open-chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
          AI
        </Badge>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-[420px] h-[650px]'
    }`}>
      <Card className="h-full flex flex-col shadow-2xl border-primary/20 bg-white dark:bg-gray-800 overflow-hidden">
        {/* Header */}
        <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-lg flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-full">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm">KRISHI AI Assistant</CardTitle>
                {!isMinimized && (
                  <p className="text-xs opacity-90">Multilingual Farming Help</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!isMinimized && (
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-12 h-8 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={onMinimizeToggle}
                data-testid="button-minimize-chatbot"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={onToggle}
                data-testid="button-close-chatbot"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="bg-primary p-1 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-[75%] space-y-2 ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}>
                        <div className={`p-3 rounded-2xl break-words ${
                          message.sender === "user"
                            ? "bg-primary text-white rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm dark:bg-gray-700 dark:text-gray-200"
                        }`}>
                          <div 
                            className="text-sm whitespace-pre-wrap word-wrap break-word" 
                            dangerouslySetInnerHTML={{
                              __html: (message.translation || message.content).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }}
                          />
                        </div>
                        
                        {message.sender === "bot" && (
                          <div className="flex items-center gap-2 text-xs">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleTextToSpeech(message.translation || message.content)}
                              data-testid="button-speak"
                            >
                              {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => translateMessage(message)}
                              data-testid="button-translate"
                            >
                              <Languages className="h-3 w-3" />
                            </Button>
                            
                            <span className="text-muted-foreground dark:text-gray-400">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        )}
                      </div>

                      {message.sender === "user" && (
                        <img src={farmerAvatar} alt="User" className="h-8 w-8 rounded-full flex-shrink-0" />
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="bg-primary p-1 rounded-full h-8 w-8 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-muted p-3 rounded-2xl rounded-bl-sm dark:bg-gray-700">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t dark:border-gray-600 flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Ask in ${languages.find(l => l.code === selectedLanguage)?.name}...`}
                  className="flex-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  data-testid="input-chat-message"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={handleVoiceInput}
                  data-testid="button-voice-input"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim() || isTyping}
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {isListening && (
                <div className="mt-2 text-center">
                  <Badge variant="destructive" className="animate-pulse">
                    <Mic className="h-3 w-3 mr-1" />
                    Listening in {languages.find(l => l.code === selectedLanguage)?.name}...
                  </Badge>
                </div>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
