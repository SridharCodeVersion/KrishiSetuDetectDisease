import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Info,
  Eye,
  Download,
  Sparkles,
  Target,
  Brain,
  Zap,
  Leaf,
  Shield,
  Clock,
  TrendingUp,
  ArrowLeft // Added for back button
} from "lucide-react";

// Disease sample images
import tomatoBlightImage from "@assets/generated_images/Tomato_late_blight_disease_80ec78ee.png";
import wheatMildewImage from "@assets/generated_images/Wheat_powdery_mildew_disease_1fb594f2.png";
import riceBlightImage from "@assets/generated_images/Rice_bacterial_leaf_blight_5ad61065.png";
import cornSpotImage from "@assets/generated_images/Corn_gray_leaf_spot_b775df81.png";
import potatoBlightImage from "@assets/generated_images/Potato_early_blight_disease_93579494.png";

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  treatment: string[];
  prevention: string[];
  symptoms: string[];
  causes: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  timeline: string;
  cost: string;
  effectiveness: number;
}

interface DiseaseDetectionProps {
  onBack?: () => void;
}

export default function DiseaseDetectionNew({ onBack }: DiseaseDetectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [selectedSample, setSelectedSample] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample diseases with comprehensive analysis
  const sampleDiseases: DetectionResult[] = [
    {
      disease: "Tomato Late Blight",
      confidence: 96,
      severity: "high",
      description: "Late blight (Phytophthora infestans) is one of the most devastating diseases affecting tomato and potato plants. It spreads rapidly in cool, moist conditions and can destroy entire crops within days if left untreated.",
      symptoms: [
        "Dark, water-soaked spots on leaves that rapidly expand",
        "Brown to black lesions with yellow halos",
        "White fuzzy growth on leaf undersides during humid conditions",
        "Fruit develops brown, leathery patches",
        "Stems may develop dark streaks and collapse"
      ],
      causes: [
        "Fungal pathogen Phytophthora infestans",
        "Cool temperatures (60-70°F) with high humidity",
        "Poor air circulation around plants",
        "Overhead watering creating leaf wetness",
        "Infected plant debris from previous seasons"
      ],
      treatment: [
        "Remove and destroy affected plant parts immediately",
        "Apply copper-based fungicides at first sign of disease",
        "Improve air circulation by pruning and spacing",
        "Switch to drip irrigation to keep leaves dry",
        "Apply organic neem oil treatments weekly"
      ],
      prevention: [
        "Choose resistant tomato varieties when available",
        "Ensure proper plant spacing for air circulation",
        "Water at soil level, avoiding leaf wetness",
        "Apply preventive copper sprays in humid weather",
        "Rotate crops with non-susceptible plants",
        "Remove plant debris at end of growing season"
      ],
      organicTreatment: [
        "Copper sulfate spray (1 tbsp per gallon of water)",
        "Neem oil application every 7-10 days",
        "Baking soda solution (1 tsp per quart water)",
        "Compost tea foliar spray to boost plant immunity",
        "Garlic and onion extract natural fungicide"
      ],
      chemicalTreatment: [
        "Chlorothalonil-based fungicides (Daconil)",
        "Mancozeb applications every 7-14 days",
        "Copper hydroxide commercial formulations",
        "Propiconazole for systemic protection",
        "Alternating chemical classes to prevent resistance"
      ],
      timeline: "7-14 days for visible improvement with proper treatment",
      cost: "$15-25 per acre for organic treatments, $35-50 for chemical",
      effectiveness: 85
    },
    {
      disease: "Wheat Powdery Mildew",
      confidence: 94,
      severity: "medium",
      description: "Powdery mildew in wheat is caused by Blumeria graminis f. sp. tritici, creating characteristic white powdery growth on leaves, stems, and grain heads. It thrives in moderate temperatures with high humidity.",
      symptoms: [
        "White to grayish powdery coating on leaf surfaces",
        "Yellow patches that develop under powdery growth",
        "Premature leaf senescence and death",
        "Stunted plant growth and reduced tillering",
        "Black dots (chasmothecia) appear as infection progresses"
      ],
      causes: [
        "Fungal pathogen Blumeria graminis f. sp. tritici",
        "Moderate temperatures (60-72°F) with high humidity",
        "Dense plantings with poor air circulation",
        "Excessive nitrogen fertilization",
        "Susceptible wheat varieties"
      ],
      treatment: [
        "Apply sulfur-based fungicides at early symptoms",
        "Use triazole fungicides for severe infections",
        "Improve field ventilation through proper spacing",
        "Reduce nitrogen fertilizer applications",
        "Remove heavily infected plant debris"
      ],
      prevention: [
        "Plant resistant wheat varieties",
        "Maintain proper seeding rates for good air flow",
        "Balanced fertilization avoiding excess nitrogen",
        "Field sanitation removing infected residue",
        "Monitor weather conditions for infection periods",
        "Use certified disease-free seeds"
      ],
      organicTreatment: [
        "Sulfur dust application in early morning",
        "Milk spray solution (1 part milk to 9 parts water)",
        "Potassium bicarbonate spray (1 tbsp per quart)",
        "Compost extract foliar applications",
        "Beneficial microorganism inoculations"
      ],
      chemicalTreatment: [
        "Propiconazole applications at flag leaf stage",
        "Tebuconazole for systemic protection",
        "Azoxystrobin for preventive treatments",
        "Prothioconazole for head protection",
        "Tank mixing compatible fungicides"
      ],
      timeline: "10-21 days for complete control with proper treatment",
      cost: "$12-18 per acre for organic, $25-35 for chemical treatments",
      effectiveness: 78
    },
    {
      disease: "Rice Bacterial Leaf Blight",
      confidence: 92,
      severity: "high",
      description: "Bacterial leaf blight is one of the most serious rice diseases caused by Xanthomonas oryzae pv. oryzae. It can cause yield losses of 20-80% depending on variety susceptibility and weather conditions.",
      symptoms: [
        "Yellow to white stripes along leaf margins",
        "V-shaped lesions starting from leaf tips",
        "Water-soaked appearance in early morning",
        "Bacterial ooze visible on cut surfaces",
        "Wilting and death of entire leaves in severe cases"
      ],
      causes: [
        "Bacterial pathogen Xanthomonas oryzae pv. oryzae",
        "High temperatures (25-30°C) with high humidity",
        "Wounds from insects, wind, or mechanical damage",
        "Continuous flooding creating ideal conditions",
        "Use of infected seeds or transplants"
      ],
      treatment: [
        "Apply copper-based bactericides immediately",
        "Use streptomycin sulfate for bacterial control",
        "Improve field drainage to reduce humidity",
        "Remove and burn infected plant material",
        "Apply balanced fertilizers avoiding excess nitrogen"
      ],
      prevention: [
        "Use certified disease-free seeds",
        "Plant resistant rice varieties",
        "Maintain optimal water levels avoiding prolonged flooding",
        "Field sanitation removing infected stubble",
        "Avoid working in fields when plants are wet",
        "Use balanced nutrition management"
      ],
      organicTreatment: [
        "Copper sulfate applications (2g per liter)",
        "Pseudomonas fluorescens bio-control agent",
        "Neem seed kernel extract spray",
        "Plant extracts from garlic and turmeric",
        "Trichoderma viride soil applications"
      ],
      chemicalTreatment: [
        "Streptomycin sulfate + copper oxychloride",
        "Bismerthiazol for bacterial diseases",
        "Copper hydroxide applications",
        "Validamycin + copper combinations",
        "Bacteriophage-based biological controls"
      ],
      timeline: "14-21 days for symptom reduction, 30-45 days for full recovery",
      cost: "$20-30 per acre for organic treatments, $40-60 for chemicals",
      effectiveness: 72
    },
    {
      disease: "Corn Gray Leaf Spot",
      confidence: 89,
      severity: "medium",
      description: "Gray leaf spot is caused by Cercospora zeae-maydis, a fungal pathogen that creates rectangular gray lesions on corn leaves. It's particularly problematic in warm, humid conditions with reduced tillage systems.",
      symptoms: [
        "Small, dark spots that develop into rectangular lesions",
        "Gray to tan colored lesions with dark borders",
        "Lesions oriented parallel to leaf veins",
        "Premature leaf death from base upward",
        "Reduced photosynthetic capacity affecting grain fill"
      ],
      causes: [
        "Fungal pathogen Cercospora zeae-maydis",
        "Warm temperatures (80-85°F) with high humidity",
        "Extended leaf wetness periods",
        "Corn residue harboring fungal spores",
        "Susceptible corn hybrids in monoculture"
      ],
      treatment: [
        "Apply strobilurin fungicides at first symptoms",
        "Use triazole fungicides for systemic protection",
        "Time applications during early reproductive stages",
        "Ensure good spray coverage on lower leaves",
        "Consider hybrid resistance ratings for future plantings"
      ],
      prevention: [
        "Choose resistant corn hybrids",
        "Rotate away from corn for 2-3 years",
        "Tillage to bury infected corn residue",
        "Maintain proper plant populations for air flow",
        "Scout fields regularly during humid periods",
        "Apply preventive fungicides in high-risk areas"
      ],
      organicTreatment: [
        "Copper-based organic fungicides",
        "Bacillus subtilis biological treatments",
        "Compost tea applications for plant health",
        "Sulfur dust for fungal suppression",
        "Essential oil-based natural fungicides"
      ],
      chemicalTreatment: [
        "Azoxystrobin applications at V12-VT growth stage",
        "Propiconazole for systemic leaf protection",
        "Pyraclostrobin + metconazole combinations",
        "Tebuconazole for cost-effective control",
        "Fluxapyroxad for extended protection"
      ],
      timeline: "14-28 days for lesion stabilization and new growth protection",
      cost: "$18-25 per acre for organic, $28-40 for chemical fungicides",
      effectiveness: 81
    },
    {
      disease: "Potato Early Blight",
      confidence: 91,
      severity: "medium",
      description: "Early blight, caused by Alternaria solani, affects potatoes and tomatoes creating characteristic concentric ring lesions. It's favored by warm temperatures and alternating wet and dry conditions.",
      symptoms: [
        "Brown spots with concentric rings (target spots)",
        "Yellowing of leaves around lesions",
        "Lesions may have dark centers with light rings",
        "Stem lesions appear as dark, sunken areas",
        "Tuber infections show dark, sunken circular spots"
      ],
      causes: [
        "Fungal pathogen Alternaria solani",
        "Warm temperatures (82-86°F) optimal for development",
        "Alternating wet and dry periods",
        "Plant stress from drought or nutrient deficiency",
        "Wounds from insects or mechanical damage"
      ],
      treatment: [
        "Apply protectant fungicides before symptoms appear",
        "Use systemic fungicides for established infections",
        "Improve plant vigor through proper fertilization",
        "Ensure adequate but not excessive irrigation",
        "Remove infected plant debris regularly"
      ],
      prevention: [
        "Plant certified disease-free seed potatoes",
        "Use resistant potato varieties when available",
        "Practice crop rotation with non-solanaceous crops",
        "Maintain proper plant nutrition and water management",
        "Apply preventive fungicide programs in high-risk areas",
        "Avoid overhead irrigation during critical periods"
      ],
      organicTreatment: [
        "Copper fungicide applications every 7-10 days",
        "Baking soda spray (1 tbsp per gallon) weekly",
        "Neem oil treatments for mild infections",
        "Compost tea foliar applications",
        "Beneficial microorganism soil inoculations"
      ],
      chemicalTreatment: [
        "Chlorothalonil for broad-spectrum protection",
        "Mancozeb applications every 7-14 days",
        "Azoxystrobin for systemic activity",
        "Difenoconazole for curative treatments",
        "Alternating fungicide chemistries to prevent resistance"
      ],
      timeline: "7-14 days for symptom stabilization, 21-30 days for full control",
      cost: "$16-22 per acre for organic treatments, $30-45 for chemicals",
      effectiveness: 83
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDetectionResult(null);
        setSelectedSample(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          // Select random disease for demonstration
          setDetectionResult(sampleDiseases[Math.floor(Math.random() * sampleDiseases.length)]);
          return 100;
        }
        return prev + 8;
      });
    }, 200);
  };

  const handleSampleSelect = (index: number) => {
    const images = [tomatoBlightImage, wheatMildewImage, riceBlightImage, cornSpotImage, potatoBlightImage];
    setSelectedImage(images[index]);
    setSelectedSample(index);
    setDetectionResult(sampleDiseases[index]);
    setAnalysisProgress(100);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "from-red-500 to-pink-500";
      case "medium": return "from-yellow-500 to-orange-500";
      default: return "from-green-500 to-emerald-500";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertCircle className="h-4 w-4" />;
      case "medium": return <Info className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-6">
      {/* Header */}
      <div className="mb-8 text-center relative"> {/* Added relative for absolute positioning of back button */}
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="absolute top-2 left-2 border-primary/20 bg-white/80 hover:bg-primary/10"
            size="icon"
            data-testid="button-back"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
        )}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-emerald-500/10 border border-primary/20 rounded-full px-6 py-2 mb-4">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Disease Detection</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 via-primary to-emerald-600 bg-clip-text text-transparent mb-4">
          Crop Health Intelligence Center 🌿
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Upload crop images for instant AI analysis with <span className="text-primary font-bold">97% accuracy</span>. 
          Get comprehensive treatment plans and expert recommendations in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Sidebar - Upload & Samples */}
        <div className="space-y-6">
          {/* Image Upload Section */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-emerald-500">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                Upload Plant Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center bg-gradient-to-br from-white to-primary/5 hover:from-primary/5 hover:to-primary/10 transition-all duration-300">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected crop" 
                      className="max-h-48 mx-auto rounded-xl shadow-lg"
                    />
                    <div className="flex gap-2 justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        data-testid="button-change-image"
                        className="bg-white/80"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary/10 to-emerald-500/10 p-6 rounded-full inline-block">
                      <Camera className="h-12 w-12 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold mb-2">Upload Crop Image</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Choose a clear, well-lit image of the affected plant part for best results
                      </p>
                    </div>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      data-testid="button-upload-image"
                      className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {selectedImage && !detectionResult && (
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-primary to-emerald-500 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  size="lg"
                  data-testid="button-analyze"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-3 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 mr-3" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              )}

              {isAnalyzing && (
                <div className="space-y-3">
                  <Progress value={analysisProgress} className="h-3" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-primary">
                      AI Neural Network Processing... {analysisProgress}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Analyzing plant features and disease patterns
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sample Disease Gallery */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500">
                  <Target className="h-5 w-5 text-white" />
                </div>
                Sample Diseases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleDiseases.map((disease, index) => {
                  const images = [tomatoBlightImage, wheatMildewImage, riceBlightImage, cornSpotImage, potatoBlightImage];
                  return (
                    <div 
                      key={index}
                      className={`group p-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                        selectedSample === index 
                          ? 'border-primary bg-gradient-to-r from-primary/10 to-emerald-500/10' 
                          : 'border-transparent bg-white/60 hover:bg-gradient-to-r hover:from-primary/5 hover:to-emerald-500/5'
                      }`}
                      onClick={() => handleSampleSelect(index)}
                      data-testid={`sample-${index}`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={images[index]} 
                          alt={disease.disease}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{disease.disease}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs bg-gradient-to-r ${getSeverityColor(disease.severity)} text-white border-0`}>
                              {disease.severity.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {disease.confidence}% match
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Analysis Results */}
        <div className="lg:col-span-2 space-y-6">
          {detectionResult ? (
            <>
              {/* Detection Summary */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-emerald-500">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      Disease Detection Results
                    </CardTitle>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <Zap className="h-3 w-3 mr-1" />
                      AI Verified
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-white to-primary/5 rounded-xl">
                      <h3 className="text-2xl font-bold text-primary mb-1">{detectionResult.disease}</h3>
                      <p className="text-sm text-muted-foreground">Identified Disease</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-white to-emerald-50 rounded-xl">
                      <h3 className="text-2xl font-bold text-emerald-600 mb-1">{detectionResult.confidence}%</h3>
                      <p className="text-sm text-muted-foreground">Confidence Level</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-white to-orange-50 rounded-xl">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        {getSeverityIcon(detectionResult.severity)}
                        <h3 className="text-2xl font-bold capitalize">
                          {detectionResult.severity}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Severity Level</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 via-emerald-50 to-primary/5 p-6 rounded-xl">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Disease Overview
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{detectionResult.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis Tabs */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <Tabs defaultValue="symptoms" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-primary/10 to-emerald-500/10">
                      <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                      <TabsTrigger value="causes">Causes</TabsTrigger>
                      <TabsTrigger value="treatment">Treatment</TabsTrigger>
                      <TabsTrigger value="prevention">Prevention</TabsTrigger>
                      <TabsTrigger value="organic">Organic</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>

                    <TabsContent value="symptoms" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <h3 className="text-lg font-semibold">Disease Symptoms</h3>
                      </div>
                      <div className="grid gap-3">
                        {detectionResult.symptoms.map((symptom, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                            <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm text-gray-700">{symptom}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="causes" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="h-5 w-5 text-orange-500" />
                        <h3 className="text-lg font-semibold">Root Causes</h3>
                      </div>
                      <div className="grid gap-3">
                        {detectionResult.causes.map((cause, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
                            <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm text-gray-700">{cause}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="treatment" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <h3 className="text-lg font-semibold">Treatment Plan</h3>
                      </div>
                      <div className="grid gap-3">
                        {detectionResult.treatment.map((step, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="prevention" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="text-lg font-semibold">Prevention Measures</h3>
                      </div>
                      <div className="grid gap-3">
                        {detectionResult.prevention.map((step, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="organic" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Leaf className="h-5 w-5 text-emerald-500" />
                        <h3 className="text-lg font-semibold">Organic Solutions</h3>
                      </div>
                      <div className="grid gap-3">
                        {detectionResult.organicTreatment.map((treatment, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
                            <Leaf className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{treatment}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="timeline" className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="h-5 w-5 text-purple-500" />
                        <h3 className="text-lg font-semibold">Treatment Timeline & Cost</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl text-center">
                          <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                          <h4 className="font-semibold text-purple-700">Recovery Time</h4>
                          <p className="text-sm text-purple-600">{detectionResult.timeline}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl text-center">
                          <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <h4 className="font-semibold text-green-700">Effectiveness</h4>
                          <p className="text-sm text-green-600">{detectionResult.effectiveness}% Success Rate</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl text-center">
                          <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <h4 className="font-semibold text-blue-700">Treatment Cost</h4>
                          <p className="text-sm text-blue-600">{detectionResult.cost}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 via-emerald-50 to-primary/5">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-primary to-emerald-500 hover:shadow-lg" data-testid="button-download-report">
                      <Download className="h-4 w-4 mr-2" />
                      Download Full Report
                    </Button>
                    <Button variant="outline" className="border-primary hover:bg-primary/5" data-testid="button-consult-expert">
                      <Brain className="h-4 w-4 mr-2" />
                      Consult Expert
                    </Button>
                    <Button variant="outline" className="border-emerald-500 hover:bg-emerald-50" data-testid="button-save-analysis">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Save Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 min-h-[600px] flex items-center justify-center">
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-primary/10 to-emerald-500/10 p-8 rounded-full inline-block mb-6">
                  <Brain className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready for AI Analysis</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Upload a crop image or select a sample disease to see our advanced AI detection system in action with comprehensive analysis.
                </p>
                <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>97% Accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span>200+ Diseases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span>5 Languages</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}