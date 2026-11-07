// ============================================================================
// INDIA LOGISTICS NETWORK — LOCATION DATA
// Real Indian cities, industrial areas, ports, rail/ICD terminals, air-cargo
// airports and warehousing clusters with their actual coordinates (WGS84).
//
// `chasehorseHub: true` marks ONLY the 6 cities the site already lists as
// Chasehorse operating hubs. Every other entry is a public geographic location
// shown as a *potential* network opportunity — not a Chasehorse facility.
//
// To add a location: append { id, name, state, lat, lng, kinds } below.
// ============================================================================

export type LocationKind = 'metro' | 'city' | 'industrial' | 'port' | 'rail' | 'air' | 'warehousing';

export interface LogisticsLocation {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  kinds: LocationKind[];
  /** One of the 6 Chasehorse operating hub cities already listed on the site. */
  chasehorseHub?: boolean;
}

export const KIND_LABELS: Record<LocationKind, string> = {
  metro: 'Metro city',
  city: 'Tier 2/3 city',
  industrial: 'Industrial area',
  port: 'Sea port',
  rail: 'Rail / ICD terminal',
  air: 'Air cargo',
  warehousing: 'Warehousing cluster',
};

type Row = [name: string, state: string, lat: number, lng: number, kinds: LocationKind[], hub?: true];

const ROWS: Row[] = [
  // ---------------- Metros ----------------
  ['Delhi', 'Delhi', 28.6139, 77.209, ['metro'], true],
  ['Mumbai', 'Maharashtra', 19.076, 72.8777, ['metro'], true],
  ['Kolkata', 'West Bengal', 22.5726, 88.3639, ['metro'], true],
  ['Chennai', 'Tamil Nadu', 13.0827, 80.2707, ['metro'], true],
  ['Bengaluru', 'Karnataka', 12.9716, 77.5946, ['metro'], true],
  ['Hyderabad', 'Telangana', 17.385, 78.4867, ['metro'], true],
  ['Ahmedabad', 'Gujarat', 23.0225, 72.5714, ['metro']],
  ['Pune', 'Maharashtra', 18.5204, 73.8567, ['metro']],

  // ---------------- Andhra Pradesh ----------------
  ['Visakhapatnam', 'Andhra Pradesh', 17.6868, 83.2185, ['city']],
  ['Vijayawada', 'Andhra Pradesh', 16.5062, 80.648, ['city']],
  ['Guntur', 'Andhra Pradesh', 16.3067, 80.4365, ['city']],
  ['Nellore', 'Andhra Pradesh', 14.4426, 79.9865, ['city']],
  ['Ongole', 'Andhra Pradesh', 15.5057, 80.0499, ['city']],
  ['Tirupati', 'Andhra Pradesh', 13.6288, 79.4192, ['city']],
  ['Kurnool', 'Andhra Pradesh', 15.8281, 78.0373, ['city']],
  ['Kakinada', 'Andhra Pradesh', 16.9891, 82.2475, ['city']],
  ['Rajahmundry', 'Andhra Pradesh', 17.0005, 81.804, ['city']],
  ['Eluru', 'Andhra Pradesh', 16.7107, 81.0952, ['city']],
  ['Anantapur', 'Andhra Pradesh', 14.6819, 77.6006, ['city']],
  ['Kadapa', 'Andhra Pradesh', 14.4673, 78.8242, ['city']],
  ['Chirala', 'Andhra Pradesh', 15.8238, 80.3522, ['city']],
  ['Tenali', 'Andhra Pradesh', 16.2379, 80.6444, ['city']],
  ['Narasaraopet', 'Andhra Pradesh', 16.2346, 80.0493, ['city']],
  ['Machilipatnam', 'Andhra Pradesh', 16.1875, 81.1389, ['city']],
  ['Bhimavaram', 'Andhra Pradesh', 16.5449, 81.5212, ['city']],
  ['Tadepalligudem', 'Andhra Pradesh', 16.8138, 81.5212, ['city']],
  ['Gudivada', 'Andhra Pradesh', 16.4353, 80.9956, ['city']],
  ['Kavali', 'Andhra Pradesh', 14.9163, 79.9945, ['city']],
  ['Srikakulam', 'Andhra Pradesh', 18.2949, 83.8938, ['city']],
  ['Vizianagaram', 'Andhra Pradesh', 18.1067, 83.3956, ['city']],
  ['Chittoor', 'Andhra Pradesh', 13.2172, 79.1003, ['city']],
  ['Nandyal', 'Andhra Pradesh', 15.4786, 78.4836, ['city']],
  ['Hindupur', 'Andhra Pradesh', 13.8293, 77.4911, ['city']],
  ['Sri City', 'Andhra Pradesh', 13.5236, 79.9933, ['industrial']],

  // ---------------- Telangana ----------------
  ['Warangal', 'Telangana', 17.9689, 79.5941, ['city']],
  ['Karimnagar', 'Telangana', 18.4386, 79.1288, ['city']],
  ['Nizamabad', 'Telangana', 18.6725, 78.094, ['city']],
  ['Khammam', 'Telangana', 17.2473, 80.1514, ['city']],
  ['Nalgonda', 'Telangana', 17.0575, 79.2671, ['city']],
  ['Mahabubnagar', 'Telangana', 16.7488, 78.0035, ['city']],
  ['Ramagundam', 'Telangana', 18.7639, 79.4753, ['city', 'industrial']],
  ['Suryapet', 'Telangana', 17.1405, 79.6236, ['city']],
  ['Siddipet', 'Telangana', 18.1018, 78.852, ['city']],
  ['Medchal', 'Telangana', 17.6297, 78.4814, ['warehousing']],

  // ---------------- Tamil Nadu & Puducherry ----------------
  ['Coimbatore', 'Tamil Nadu', 11.0168, 76.9558, ['city']],
  ['Madurai', 'Tamil Nadu', 9.9252, 78.1198, ['city']],
  ['Tiruchirappalli', 'Tamil Nadu', 10.7905, 78.7047, ['city']],
  ['Salem', 'Tamil Nadu', 11.6643, 78.146, ['city']],
  ['Tiruppur', 'Tamil Nadu', 11.1085, 77.3411, ['city', 'industrial']],
  ['Erode', 'Tamil Nadu', 11.341, 77.7172, ['city']],
  ['Vellore', 'Tamil Nadu', 12.9165, 79.1325, ['city']],
  ['Thoothukudi', 'Tamil Nadu', 8.7642, 78.1348, ['city']],
  ['Tirunelveli', 'Tamil Nadu', 8.7139, 77.7567, ['city']],
  ['Thanjavur', 'Tamil Nadu', 10.787, 79.1378, ['city']],
  ['Hosur', 'Tamil Nadu', 12.7409, 77.8253, ['city', 'industrial']],
  ['Krishnagiri', 'Tamil Nadu', 12.5266, 78.2141, ['city']],
  ['Namakkal', 'Tamil Nadu', 11.2189, 78.1674, ['city']],
  ['Karur', 'Tamil Nadu', 10.9601, 78.0766, ['city']],
  ['Dindigul', 'Tamil Nadu', 10.3624, 77.9695, ['city']],
  ['Nagercoil', 'Tamil Nadu', 8.1833, 77.4119, ['city']],
  ['Cuddalore', 'Tamil Nadu', 11.748, 79.7714, ['city']],
  ['Kanchipuram', 'Tamil Nadu', 12.8342, 79.7036, ['city']],
  ['Villupuram', 'Tamil Nadu', 11.9401, 79.4861, ['city']],
  ['Puducherry', 'Puducherry', 11.9416, 79.8083, ['city']],
  ['Sriperumbudur', 'Tamil Nadu', 12.9675, 79.9419, ['industrial', 'warehousing']],
  ['Oragadam', 'Tamil Nadu', 12.8333, 79.95, ['industrial']],
  ['Ranipet', 'Tamil Nadu', 12.9224, 79.3326, ['industrial']],
  ['Red Hills', 'Tamil Nadu', 13.1869, 80.1847, ['warehousing']],

  // ---------------- Karnataka ----------------
  ['Mysuru', 'Karnataka', 12.2958, 76.6394, ['city']],
  ['Mangaluru', 'Karnataka', 12.9141, 74.856, ['city']],
  ['Hubballi', 'Karnataka', 15.3647, 75.124, ['city']],
  ['Belagavi', 'Karnataka', 15.8497, 74.4977, ['city']],
  ['Kalaburagi', 'Karnataka', 17.3297, 76.8343, ['city']],
  ['Davanagere', 'Karnataka', 14.4644, 75.9218, ['city']],
  ['Ballari', 'Karnataka', 15.1394, 76.9214, ['city', 'industrial']],
  ['Shivamogga', 'Karnataka', 13.9299, 75.5681, ['city']],
  ['Tumakuru', 'Karnataka', 13.3379, 77.1173, ['city']],
  ['Vijayapura', 'Karnataka', 16.8302, 75.71, ['city']],
  ['Hassan', 'Karnataka', 13.0072, 76.0962, ['city']],
  ['Udupi', 'Karnataka', 13.3409, 74.7421, ['city']],
  ['Raichur', 'Karnataka', 16.2076, 77.3463, ['city']],
  ['Kolar', 'Karnataka', 13.1362, 78.1298, ['city']],
  ['Peenya', 'Karnataka', 13.0285, 77.5197, ['industrial']],
  ['Bidadi', 'Karnataka', 12.7969, 77.3836, ['industrial']],
  ['Jigani', 'Karnataka', 12.7869, 77.6386, ['industrial']],
  ['Hoskote', 'Karnataka', 13.0707, 77.7982, ['warehousing']],
  ['Nelamangala', 'Karnataka', 13.0975, 77.3936, ['warehousing']],

  // ---------------- Kerala ----------------
  ['Kochi', 'Kerala', 9.9312, 76.2673, ['city']],
  ['Thiruvananthapuram', 'Kerala', 8.5241, 76.9366, ['city']],
  ['Kozhikode', 'Kerala', 11.2588, 75.7804, ['city']],
  ['Thrissur', 'Kerala', 10.5276, 76.2144, ['city']],
  ['Kollam', 'Kerala', 8.8932, 76.6141, ['city']],
  ['Kannur', 'Kerala', 11.8745, 75.3704, ['city']],
  ['Palakkad', 'Kerala', 10.7867, 76.6548, ['city']],
  ['Alappuzha', 'Kerala', 9.4981, 76.3388, ['city']],
  ['Kottayam', 'Kerala', 9.5916, 76.5222, ['city']],
  ['Malappuram', 'Kerala', 11.051, 76.0711, ['city']],

  // ---------------- Goa ----------------
  ['Panaji', 'Goa', 15.4909, 73.8278, ['city']],
  ['Margao', 'Goa', 15.2832, 73.9862, ['city']],

  // ---------------- Maharashtra ----------------
  ['Nagpur', 'Maharashtra', 21.1458, 79.0882, ['city']],
  ['Nashik', 'Maharashtra', 19.9975, 73.7898, ['city']],
  ['Chhatrapati Sambhajinagar', 'Maharashtra', 19.8762, 75.3433, ['city']],
  ['Solapur', 'Maharashtra', 17.6599, 75.9064, ['city']],
  ['Kolhapur', 'Maharashtra', 16.705, 74.2433, ['city']],
  ['Amravati', 'Maharashtra', 20.9374, 77.7796, ['city']],
  ['Thane', 'Maharashtra', 19.2183, 72.9781, ['city']],
  ['Navi Mumbai', 'Maharashtra', 19.033, 73.0297, ['city']],
  ['Akola', 'Maharashtra', 20.7002, 77.0082, ['city']],
  ['Jalgaon', 'Maharashtra', 21.0077, 75.5626, ['city']],
  ['Nanded', 'Maharashtra', 19.1383, 77.321, ['city']],
  ['Latur', 'Maharashtra', 18.4088, 76.5604, ['city']],
  ['Sangli', 'Maharashtra', 16.8524, 74.5815, ['city']],
  ['Ahilyanagar', 'Maharashtra', 19.0948, 74.748, ['city']],
  ['Satara', 'Maharashtra', 17.6805, 74.0183, ['city']],
  ['Ratnagiri', 'Maharashtra', 16.9902, 73.312, ['city']],
  ['Chandrapur', 'Maharashtra', 19.9615, 79.2961, ['city', 'industrial']],
  ['Dhule', 'Maharashtra', 20.9042, 74.7749, ['city']],
  ['Wardha', 'Maharashtra', 20.7453, 78.6022, ['city']],
  ['Bhiwandi', 'Maharashtra', 19.2967, 73.0631, ['warehousing']],
  ['Taloja', 'Maharashtra', 19.0661, 73.1167, ['industrial']],
  ['Chakan', 'Maharashtra', 18.7606, 73.8636, ['industrial', 'warehousing']],
  ['Ranjangaon', 'Maharashtra', 18.7569, 74.2411, ['industrial']],
  ['Waluj', 'Maharashtra', 19.8417, 75.2417, ['industrial']],
  ['Butibori', 'Maharashtra', 20.95, 78.9417, ['industrial']],

  // ---------------- Gujarat ----------------
  ['Surat', 'Gujarat', 21.1702, 72.8311, ['city']],
  ['Vadodara', 'Gujarat', 22.3072, 73.1812, ['city']],
  ['Rajkot', 'Gujarat', 22.3039, 70.8022, ['city']],
  ['Bhavnagar', 'Gujarat', 21.7645, 72.1519, ['city']],
  ['Jamnagar', 'Gujarat', 22.4707, 70.0577, ['city', 'industrial']],
  ['Gandhinagar', 'Gujarat', 23.2156, 72.6369, ['city']],
  ['Junagadh', 'Gujarat', 21.5222, 70.4579, ['city']],
  ['Anand', 'Gujarat', 22.5645, 72.9289, ['city']],
  ['Bharuch', 'Gujarat', 21.7051, 72.9959, ['city']],
  ['Morbi', 'Gujarat', 22.8173, 70.8377, ['city', 'industrial']],
  ['Bhuj', 'Gujarat', 23.2419, 69.6669, ['city']],
  ['Mehsana', 'Gujarat', 23.588, 72.3693, ['city']],
  ['Navsari', 'Gujarat', 20.9467, 72.952, ['city']],
  ['Valsad', 'Gujarat', 20.5992, 72.9342, ['city']],
  ['Gandhidham', 'Gujarat', 23.0753, 70.1337, ['city']],
  ['Porbandar', 'Gujarat', 21.6417, 69.6293, ['city']],
  ['Sanand', 'Gujarat', 22.9925, 72.3816, ['industrial']],
  ['Becharaji', 'Gujarat', 23.4947, 72.0419, ['industrial']],
  ['Halol', 'Gujarat', 22.5026, 73.4715, ['industrial']],
  ['Ankleshwar', 'Gujarat', 21.6264, 73.0152, ['industrial']],
  ['Vapi', 'Gujarat', 20.3893, 72.9106, ['industrial']],
  ['Changodar', 'Gujarat', 22.9297, 72.4419, ['warehousing']],

  // ---------------- Rajasthan ----------------
  ['Jaipur', 'Rajasthan', 26.9124, 75.7873, ['city']],
  ['Jodhpur', 'Rajasthan', 26.2389, 73.0243, ['city']],
  ['Udaipur', 'Rajasthan', 24.5854, 73.7125, ['city']],
  ['Kota', 'Rajasthan', 25.2138, 75.8648, ['city']],
  ['Ajmer', 'Rajasthan', 26.4499, 74.6399, ['city']],
  ['Bikaner', 'Rajasthan', 28.0229, 73.3119, ['city']],
  ['Alwar', 'Rajasthan', 27.553, 76.6346, ['city']],
  ['Bhilwara', 'Rajasthan', 25.3463, 74.6364, ['city']],
  ['Sikar', 'Rajasthan', 27.6094, 75.1399, ['city']],
  ['Bharatpur', 'Rajasthan', 27.2152, 77.503, ['city']],
  ['Sri Ganganagar', 'Rajasthan', 29.9038, 73.8772, ['city']],
  ['Pali', 'Rajasthan', 25.7711, 73.3234, ['city']],
  ['Chittorgarh', 'Rajasthan', 24.8887, 74.6269, ['city']],
  ['Barmer', 'Rajasthan', 25.7521, 71.3967, ['city']],
  ['Neemrana', 'Rajasthan', 27.9893, 76.3866, ['industrial']],
  ['Bhiwadi', 'Rajasthan', 28.2104, 76.8606, ['industrial']],

  // ---------------- Madhya Pradesh ----------------
  ['Indore', 'Madhya Pradesh', 22.7196, 75.8577, ['city']],
  ['Bhopal', 'Madhya Pradesh', 23.2599, 77.4126, ['city']],
  ['Jabalpur', 'Madhya Pradesh', 23.1815, 79.9864, ['city']],
  ['Gwalior', 'Madhya Pradesh', 26.2183, 78.1828, ['city']],
  ['Ujjain', 'Madhya Pradesh', 23.1765, 75.7885, ['city']],
  ['Sagar', 'Madhya Pradesh', 23.8388, 78.7378, ['city']],
  ['Satna', 'Madhya Pradesh', 24.6005, 80.8322, ['city']],
  ['Rewa', 'Madhya Pradesh', 24.5362, 81.3037, ['city']],
  ['Ratlam', 'Madhya Pradesh', 23.3315, 75.0367, ['city']],
  ['Dewas', 'Madhya Pradesh', 22.9676, 76.0534, ['city']],
  ['Katni', 'Madhya Pradesh', 23.8343, 80.3894, ['city']],
  ['Khandwa', 'Madhya Pradesh', 21.8257, 76.3526, ['city']],
  ['Chhindwara', 'Madhya Pradesh', 22.0574, 78.9382, ['city']],
  ['Pithampur', 'Madhya Pradesh', 22.6134, 75.6789, ['industrial']],
  ['Mandideep', 'Madhya Pradesh', 23.0983, 77.5335, ['industrial']],

  // ---------------- Chhattisgarh ----------------
  ['Raipur', 'Chhattisgarh', 21.2514, 81.6296, ['city']],
  ['Bilaspur', 'Chhattisgarh', 22.0797, 82.1409, ['city']],
  ['Durg', 'Chhattisgarh', 21.1904, 81.2849, ['city']],
  ['Bhilai', 'Chhattisgarh', 21.2092, 81.4285, ['industrial']],
  ['Korba', 'Chhattisgarh', 22.3595, 82.7501, ['city', 'industrial']],
  ['Raigarh', 'Chhattisgarh', 21.8974, 83.395, ['city', 'industrial']],
  ['Jagdalpur', 'Chhattisgarh', 19.0748, 82.008, ['city']],

  // ---------------- Uttar Pradesh ----------------
  ['Lucknow', 'Uttar Pradesh', 26.8467, 80.9462, ['city']],
  ['Kanpur', 'Uttar Pradesh', 26.4499, 80.3319, ['city', 'industrial']],
  ['Agra', 'Uttar Pradesh', 27.1767, 78.0081, ['city']],
  ['Varanasi', 'Uttar Pradesh', 25.3176, 82.9739, ['city']],
  ['Prayagraj', 'Uttar Pradesh', 25.4358, 81.8463, ['city']],
  ['Ghaziabad', 'Uttar Pradesh', 28.6692, 77.4538, ['city']],
  ['Noida', 'Uttar Pradesh', 28.5355, 77.391, ['city', 'industrial']],
  ['Greater Noida', 'Uttar Pradesh', 28.4744, 77.504, ['industrial']],
  ['Meerut', 'Uttar Pradesh', 28.9845, 77.7064, ['city']],
  ['Bareilly', 'Uttar Pradesh', 28.367, 79.4304, ['city']],
  ['Aligarh', 'Uttar Pradesh', 27.8974, 78.088, ['city']],
  ['Moradabad', 'Uttar Pradesh', 28.8386, 78.7733, ['city']],
  ['Gorakhpur', 'Uttar Pradesh', 26.7606, 83.3732, ['city']],
  ['Saharanpur', 'Uttar Pradesh', 29.968, 77.5552, ['city']],
  ['Jhansi', 'Uttar Pradesh', 25.4484, 78.5685, ['city']],
  ['Mathura', 'Uttar Pradesh', 27.4924, 77.6737, ['city']],
  ['Firozabad', 'Uttar Pradesh', 27.1592, 78.3957, ['city']],
  ['Ayodhya', 'Uttar Pradesh', 26.7922, 82.1998, ['city']],
  ['Shahjahanpur', 'Uttar Pradesh', 27.8826, 79.9119, ['city']],
  ['Muzaffarnagar', 'Uttar Pradesh', 29.4727, 77.7085, ['city']],
  ['Etawah', 'Uttar Pradesh', 26.7856, 79.0158, ['city']],

  // ---------------- Uttarakhand ----------------
  ['Dehradun', 'Uttarakhand', 30.3165, 78.0322, ['city']],
  ['Haridwar', 'Uttarakhand', 29.9457, 78.1642, ['city', 'industrial']],
  ['Rudrapur', 'Uttarakhand', 28.9875, 79.4141, ['city', 'industrial']],
  ['Haldwani', 'Uttarakhand', 29.2183, 79.513, ['city']],
  ['Roorkee', 'Uttarakhand', 29.8543, 77.888, ['city']],

  // ---------------- Haryana, Punjab, Chandigarh ----------------
  ['Gurugram', 'Haryana', 28.4595, 77.0266, ['city']],
  ['Faridabad', 'Haryana', 28.4089, 77.3178, ['city', 'industrial']],
  ['Manesar', 'Haryana', 28.3592, 76.9361, ['industrial']],
  ['Bawal', 'Haryana', 28.0738, 76.5839, ['industrial']],
  ['Farrukhnagar', 'Haryana', 28.4462, 76.8235, ['warehousing']],
  ['Kundli', 'Haryana', 28.8783, 77.1206, ['warehousing']],
  ['Panipat', 'Haryana', 29.3909, 76.9635, ['city', 'industrial']],
  ['Ambala', 'Haryana', 30.3782, 76.7767, ['city']],
  ['Hisar', 'Haryana', 29.1492, 75.7217, ['city']],
  ['Rohtak', 'Haryana', 28.8955, 76.6066, ['city']],
  ['Karnal', 'Haryana', 29.6857, 76.9905, ['city']],
  ['Sonipat', 'Haryana', 28.9931, 77.0151, ['city']],
  ['Rewari', 'Haryana', 28.1928, 76.6239, ['city']],
  ['Yamunanagar', 'Haryana', 30.129, 77.2674, ['city']],
  ['Ludhiana', 'Punjab', 30.901, 75.8573, ['city', 'industrial']],
  ['Amritsar', 'Punjab', 31.634, 74.8723, ['city']],
  ['Jalandhar', 'Punjab', 31.326, 75.5762, ['city']],
  ['Patiala', 'Punjab', 30.3398, 76.3869, ['city']],
  ['Bathinda', 'Punjab', 30.211, 74.9455, ['city']],
  ['Mohali', 'Punjab', 30.7046, 76.7179, ['city']],
  ['Pathankot', 'Punjab', 32.2643, 75.6421, ['city']],
  ['Chandigarh', 'Chandigarh', 30.7333, 76.7794, ['city']],

  // ---------------- Himachal, J&K, Ladakh ----------------
  ['Shimla', 'Himachal Pradesh', 31.1048, 77.1734, ['city']],
  ['Solan', 'Himachal Pradesh', 30.9045, 77.0967, ['city']],
  ['Baddi', 'Himachal Pradesh', 30.958, 76.7914, ['industrial']],
  ['Jammu', 'Jammu & Kashmir', 32.7266, 74.857, ['city']],
  ['Kathua', 'Jammu & Kashmir', 32.3693, 75.5254, ['city']],
  ['Srinagar', 'Jammu & Kashmir', 34.0837, 74.7973, ['city']],
  ['Leh', 'Ladakh', 34.1526, 77.5771, ['city']],

  // ---------------- Bihar ----------------
  ['Patna', 'Bihar', 25.5941, 85.1376, ['city']],
  ['Gaya', 'Bihar', 24.7914, 85.0002, ['city']],
  ['Muzaffarpur', 'Bihar', 26.1209, 85.3647, ['city']],
  ['Bhagalpur', 'Bihar', 25.2425, 86.9842, ['city']],
  ['Darbhanga', 'Bihar', 26.1542, 85.8918, ['city']],
  ['Purnia', 'Bihar', 25.7771, 87.4753, ['city']],
  ['Begusarai', 'Bihar', 25.4182, 86.1272, ['city']],

  // ---------------- Jharkhand ----------------
  ['Ranchi', 'Jharkhand', 23.3441, 85.3096, ['city']],
  ['Jamshedpur', 'Jharkhand', 22.8046, 86.2029, ['city', 'industrial']],
  ['Dhanbad', 'Jharkhand', 23.7957, 86.4304, ['city']],
  ['Bokaro Steel City', 'Jharkhand', 23.6693, 86.1511, ['city', 'industrial']],
  ['Hazaribagh', 'Jharkhand', 23.9925, 85.3637, ['city']],
  ['Deoghar', 'Jharkhand', 24.4852, 86.6948, ['city']],

  // ---------------- Odisha ----------------
  ['Bhubaneswar', 'Odisha', 20.2961, 85.8245, ['city']],
  ['Cuttack', 'Odisha', 20.4625, 85.883, ['city']],
  ['Rourkela', 'Odisha', 22.2604, 84.8536, ['city', 'industrial']],
  ['Sambalpur', 'Odisha', 21.4669, 83.9812, ['city']],
  ['Berhampur', 'Odisha', 19.3149, 84.7941, ['city']],
  ['Balasore', 'Odisha', 21.4934, 86.9135, ['city']],
  ['Angul', 'Odisha', 20.8444, 85.1511, ['city', 'industrial']],
  ['Jharsuguda', 'Odisha', 21.8554, 84.0062, ['city', 'industrial']],
  ['Kalinganagar', 'Odisha', 20.9481, 86.0256, ['industrial']],

  // ---------------- West Bengal ----------------
  ['Siliguri', 'West Bengal', 26.7271, 88.3953, ['city']],
  ['Durgapur', 'West Bengal', 23.5204, 87.3119, ['city', 'industrial']],
  ['Asansol', 'West Bengal', 23.6739, 86.9524, ['city']],
  ['Howrah', 'West Bengal', 22.5958, 88.2636, ['city']],
  ['Kharagpur', 'West Bengal', 22.346, 87.232, ['city']],
  ['Malda', 'West Bengal', 25.0108, 88.1411, ['city']],
  ['Bardhaman', 'West Bengal', 23.2324, 87.8615, ['city']],
  ['Dankuni', 'West Bengal', 22.6788, 88.2918, ['warehousing', 'rail']],

  // ---------------- North-East & Andaman ----------------
  ['Guwahati', 'Assam', 26.1445, 91.7362, ['city']],
  ['Silchar', 'Assam', 24.8333, 92.7789, ['city']],
  ['Dibrugarh', 'Assam', 27.4728, 94.912, ['city']],
  ['Jorhat', 'Assam', 26.7509, 94.2037, ['city']],
  ['Tezpur', 'Assam', 26.6528, 92.7926, ['city']],
  ['Shillong', 'Meghalaya', 25.5788, 91.8933, ['city']],
  ['Agartala', 'Tripura', 23.8315, 91.2868, ['city']],
  ['Imphal', 'Manipur', 24.817, 93.9368, ['city']],
  ['Aizawl', 'Mizoram', 23.7271, 92.7176, ['city']],
  ['Kohima', 'Nagaland', 25.6751, 94.1086, ['city']],
  ['Dimapur', 'Nagaland', 25.9091, 93.7266, ['city']],
  ['Itanagar', 'Arunachal Pradesh', 27.0844, 93.6053, ['city']],
  ['Gangtok', 'Sikkim', 27.3389, 88.6065, ['city']],
  ['Port Blair', 'Andaman & Nicobar', 11.6234, 92.7265, ['city', 'port']],

  // ---------------- Sea ports ----------------
  ['JNPA (Nhava Sheva)', 'Maharashtra', 18.9497, 72.9506, ['port']],
  ['Mumbai Port', 'Maharashtra', 18.9388, 72.8437, ['port']],
  ['Mundra Port', 'Gujarat', 22.7392, 69.7086, ['port']],
  ['Deendayal Port (Kandla)', 'Gujarat', 23.0333, 70.2167, ['port']],
  ['Hazira Port', 'Gujarat', 21.0992, 72.6303, ['port', 'industrial']],
  ['Pipavav Port', 'Gujarat', 20.9208, 71.5089, ['port']],
  ['Dahej', 'Gujarat', 21.7, 72.5333, ['port', 'industrial']],
  ['Chennai Port', 'Tamil Nadu', 13.0975, 80.2969, ['port']],
  ['Kamarajar Port (Ennore)', 'Tamil Nadu', 13.2556, 80.3264, ['port']],
  ['Kattupalli Port', 'Tamil Nadu', 13.3017, 80.3417, ['port']],
  ['V.O. Chidambaranar Port', 'Tamil Nadu', 8.7489, 78.2017, ['port']],
  ['Cochin Port (Vallarpadam)', 'Kerala', 9.9814, 76.2589, ['port']],
  ['Vizhinjam Port', 'Kerala', 8.3778, 76.9889, ['port']],
  ['New Mangalore Port', 'Karnataka', 12.9256, 74.8128, ['port']],
  ['Mormugao Port', 'Goa', 15.4097, 73.7997, ['port']],
  ['Visakhapatnam Port', 'Andhra Pradesh', 17.6942, 83.2894, ['port']],
  ['Gangavaram Port', 'Andhra Pradesh', 17.6206, 83.2317, ['port']],
  ['Kakinada Port', 'Andhra Pradesh', 16.9478, 82.2797, ['port']],
  ['Krishnapatnam Port', 'Andhra Pradesh', 14.2511, 80.1269, ['port']],
  ['Paradip Port', 'Odisha', 20.2647, 86.6708, ['port']],
  ['Dhamra Port', 'Odisha', 20.7919, 86.9614, ['port']],
  ['Gopalpur Port', 'Odisha', 19.2622, 84.9103, ['port']],
  ['Haldia Dock Complex', 'West Bengal', 22.0303, 88.0961, ['port', 'industrial']],
  ['Syama Prasad Mookerjee Port', 'West Bengal', 22.5464, 88.3192, ['port']],

  // ---------------- Rail / ICD terminals ----------------
  ['ICD Tughlakabad', 'Delhi', 28.5128, 77.2833, ['rail']],
  ['ICD Patparganj', 'Delhi', 28.6236, 77.3086, ['rail']],
  ['ICD Dadri', 'Uttar Pradesh', 28.5522, 77.5528, ['rail']],
  ['ICD Garhi Harsaru', 'Haryana', 28.4236, 76.9411, ['rail']],
  ['ICD Sabarmati', 'Gujarat', 23.0839, 72.5806, ['rail']],
  ['ICD Whitefield', 'Karnataka', 12.9833, 77.75, ['rail']],
  ['ICD Dhandari Kalan', 'Punjab', 30.8667, 75.9167, ['rail']],
  ['ICD Irugur', 'Tamil Nadu', 11.0167, 77.0667, ['rail']],
  ['ICD Talegaon', 'Maharashtra', 18.7333, 73.6833, ['rail']],
  ['MIHAN Nagpur', 'Maharashtra', 21.0583, 79.0472, ['rail', 'industrial']],

  // ---------------- Air cargo ----------------
  ['Delhi Air Cargo (IGI)', 'Delhi', 28.5562, 77.1, ['air']],
  ['Mumbai Air Cargo (CSMIA)', 'Maharashtra', 19.0896, 72.8656, ['air']],
  ['Chennai Air Cargo', 'Tamil Nadu', 12.9941, 80.1709, ['air']],
  ['Bengaluru Air Cargo (KIA)', 'Karnataka', 13.1986, 77.7066, ['air']],
  ['Hyderabad Air Cargo (RGIA)', 'Telangana', 17.2403, 78.4294, ['air']],
  ['Kolkata Air Cargo', 'West Bengal', 22.6547, 88.4467, ['air']],
  ['Ahmedabad Air Cargo', 'Gujarat', 23.0734, 72.6266, ['air']],
];

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const LOGISTICS_LOCATIONS: LogisticsLocation[] = ROWS.map(([name, state, lat, lng, kinds, hub]) => ({
  id: slug(`${name}-${state}`),
  name,
  state,
  lat,
  lng,
  kinds,
  ...(hub ? { chasehorseHub: true } : {}),
}));
