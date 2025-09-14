
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Sprout,
  Save,
  Camera,
  Edit3,
  Trophy,
  Star,
  ArrowLeft,
  Mail,
  Home,
  Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FarmerProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  farmSize: string;
  cropTypes: string[];
  experience: string;
  farmingMethod: string;
  bio: string;
  profileImage: string;
}

interface ProfileProps {
  onBack: () => void;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const cropOptions = [
  "Rice", "Wheat", "Cotton", "Sugarcane", "Tea", "Coffee", "Spices",
  "Pulses", "Oilseeds", "Fruits", "Vegetables", "Flowers", "Medicinal Plants"
];

const farmingMethods = [
  "Organic Farming", "Conventional Farming", "Mixed Farming", 
  "Hydroponic", "Sustainable Agriculture", "Precision Farming"
];

export default function Profile({ onBack }: ProfileProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<FarmerProfile>({
    name: "Farmer Raj",
    email: "raj.farmer@example.com",
    phone: "+91 98765 43210",
    address: "Village Krishnapur, Taluka Khandwa",
    city: "Khandwa",
    state: "Madhya Pradesh",
    farmSize: "25 acres",
    cropTypes: ["Wheat", "Cotton", "Pulses"],
    experience: "15 years",
    farmingMethod: "Mixed Farming",
    bio: "Passionate farmer with over 15 years of experience in sustainable agriculture. Specializing in wheat and cotton cultivation with focus on organic methods.",
    profileImage: ""
  });

  const [editProfile, setEditProfile] = useState<FarmerProfile>(profile);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('farmerProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setEditProfile(parsedProfile);
    }
  }, []);

  const handleSave = () => {
    setProfile(editProfile);
    localStorage.setItem('farmerProfile', JSON.stringify(editProfile));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully!",
    });
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  const handleCropToggle = (crop: string) => {
    const newCrops = editProfile.cropTypes.includes(crop)
      ? editProfile.cropTypes.filter(c => c !== crop)
      : [...editProfile.cropTypes, crop];
    setEditProfile({ ...editProfile, cropTypes: newCrops });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-blue-950 dark:to-emerald-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-primary/20 bg-white/80 hover:bg-primary/10"
            size="icon"
            data-testid="button-back"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground dark:text-white">Farmer Profile</h1>
            <p className="text-muted-foreground dark:text-gray-400">Manage your personal information and farming details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <Card className="lg:col-span-1 border-0 shadow-xl bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader className="text-center pb-2">
              <div className="relative mx-auto mb-4">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={profile.profileImage} alt={profile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xl font-bold">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-primary/20"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <CardTitle className="text-xl dark:text-white">{profile.name}</CardTitle>
              <p className="text-sm text-muted-foreground dark:text-gray-400">{profile.city}, {profile.state}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm dark:text-gray-300">Experience</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                  {profile.experience}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-green-500" />
                  <span className="text-sm dark:text-gray-300">Farm Size</span>
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  {profile.farmSize}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-blue-500" />
                  <span className="text-sm dark:text-gray-300">Method</span>
                </div>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {profile.farmingMethod}
                </Badge>
              </div>
              
              <div className="pt-4">
                <Label className="text-sm font-medium dark:text-gray-300">Crops Grown</Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {profile.cropTypes.map((crop, index) => (
                    <Badge key={index} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>

              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Profile Details Form */}
          <Card className="lg:col-span-2 border-0 shadow-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <User className="h-5 w-5 text-primary" />
                {isEditing ? "Edit Profile Details" : "Profile Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold dark:text-gray-300">Basic Information</Label>
                  
                  <div>
                    <Label htmlFor="name" className="dark:text-gray-300">Full Name</Label>
                    <Input
                      id="name"
                      value={isEditing ? editProfile.name : profile.name}
                      onChange={(e) => isEditing && setEditProfile({...editProfile, name: e.target.value})}
                      disabled={!isEditing}
                      className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editProfile.email : profile.email}
                        onChange={(e) => isEditing && setEditProfile({...editProfile, email: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="dark:text-gray-300">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        id="phone"
                        value={isEditing ? editProfile.phone : profile.phone}
                        onChange={(e) => isEditing && setEditProfile({...editProfile, phone: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold dark:text-gray-300">Location Details</Label>
                  
                  <div>
                    <Label htmlFor="address" className="dark:text-gray-300">Address</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        id="address"
                        value={isEditing ? editProfile.address : profile.address}
                        onChange={(e) => isEditing && setEditProfile({...editProfile, address: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city" className="dark:text-gray-300">City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        id="city"
                        value={isEditing ? editProfile.city : profile.city}
                        onChange={(e) => isEditing && setEditProfile({...editProfile, city: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="state" className="dark:text-gray-300">State</Label>
                    {isEditing ? (
                      <Select value={editProfile.state} onValueChange={(value) => setEditProfile({...editProfile, state: value})}>
                        <SelectTrigger className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input value={profile.state} disabled className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Farming Information */}
              <div className="space-y-4 pt-4 border-t dark:border-gray-600">
                <Label className="text-base font-semibold dark:text-gray-300">Farming Details</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmSize" className="dark:text-gray-300">Farm Size</Label>
                    <div className="relative">
                      <Sprout className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        id="farmSize"
                        value={isEditing ? editProfile.farmSize : profile.farmSize}
                        onChange={(e) => isEditing && setEditProfile({...editProfile, farmSize: e.target.value})}
                        disabled={!isEditing}
                        placeholder="e.g., 10 acres"
                        className="pl-10 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="dark:text-gray-300">Experience</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <Input
                        id="experience"
                        value={isEditing ? editProfile.experience : profile.experience}
                        onChange={(e) => isEditing && setEditProfile({...editProfile, experience: e.target.value})}
                        disabled={!isEditing}
                        placeholder="e.g., 10 years"
                        className="pl-10 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="farmingMethod" className="dark:text-gray-300">Farming Method</Label>
                  {isEditing ? (
                    <Select value={editProfile.farmingMethod} onValueChange={(value) => setEditProfile({...editProfile, farmingMethod: value})}>
                      <SelectTrigger className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {farmingMethods.map((method) => (
                          <SelectItem key={method} value={method}>{method}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input value={profile.farmingMethod} disabled className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
                  )}
                </div>

                {/* Crop Types */}
                <div>
                  <Label className="dark:text-gray-300">Crops Grown</Label>
                  {isEditing ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {cropOptions.map((crop) => (
                        <Label key={crop} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editProfile.cropTypes.includes(crop)}
                            onChange={() => handleCropToggle(crop)}
                            className="rounded"
                          />
                          <span className="text-sm dark:text-gray-300">{crop}</span>
                        </Label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.cropTypes.map((crop, index) => (
                        <Badge key={index} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio" className="dark:text-gray-300">Bio</Label>
                  <Textarea
                    id="bio"
                    value={isEditing ? editProfile.bio : profile.bio}
                    onChange={(e) => isEditing && setEditProfile({...editProfile, bio: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Tell us about your farming journey and expertise..."
                    rows={4}
                    className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-6 border-t dark:border-gray-600">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 dark:border-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
