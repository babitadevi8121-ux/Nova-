import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TermIcon, Cpu, Database, Play, Trash2, Check, Loader2, Sparkles, 
  Search, Monitor, Gamepad, Network, Activity, Layers, Save, Plus,
  Shield, Lock, Unlock, Eye, RefreshCw, HelpCircle, Radio, Skull,
  Folder, Globe, FileText, Minimize2, Maximize2, Settings as WinSettings, Key,
  ShoppingBag, User as UserIcon, Power, Wifi, Volume2, Battery, Calendar, ChevronUp,
  AlertCircle, X, MessageCircle, Zap, Server, Sliders, TrendingUp
} from 'lucide-react';
import { User } from '../types';

interface LinuxSoftwareProps {
  user: User | null;
  onOpenAuth?: () => void;
  onOpenPricing?: () => void;
}

interface FileSystem {
  [path: string]: string;
}

interface InstalledPackage {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  size: string;
  isInstalled: boolean;
  command: string;
}

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'header';
  text: string;
}

interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped';
  ports: string;
  uptime: string;
}

interface NetworkNode {
  ip: string;
  host: string;
  type: string;
  ping: string;
  ports: string[];
}

const countriesData = [
  { id: 'afghanistan', name: 'Afghanistan (Kabul)', flag: '🇦🇫', reg: 'Asia', jur: 'Central Asia' },
  { id: 'albania', name: 'Albania (Tirana)', flag: '🇦🇱', reg: 'Europe', jur: 'Balkans Jur.' },
  { id: 'algeria', name: 'Algeria (Algiers)', flag: '🇩🇿', reg: 'Africa', jur: 'AU Juris' },
  { id: 'andorra', name: 'Andorra (Andorra la Vella)', flag: '🇦🇩', reg: 'Europe', jur: 'Andorran Court' },
  { id: 'angola', name: 'Angola (Luanda)', flag: '🇦🇴', reg: 'Africa', jur: 'Sovereign Node' },
  { id: 'antigua', name: 'Antigua & Barbuda (St. John\'s)', flag: '🇦🇬', reg: 'Americas', jur: 'Carib Free Trade' },
  { id: 'argentina', name: 'Argentina (Buenos Aires)', flag: '🇦🇷', reg: 'Americas', jur: 'S. American Free' },
  { id: 'armenia', name: 'Armenia (Yerevan)', flag: '🇦🇲', reg: 'Asia', jur: 'Eurasia Node' },
  { id: 'australia', name: 'Australia (Canberra)', flag: '🇦🇺', reg: 'Oceania', jur: 'AU Privacy' },
  { id: 'austria', name: 'Austria (Vienna)', flag: '🇦🇹', reg: 'Europe', jur: 'GDPR Co' },
  { id: 'azerbaijan', name: 'Azerbaijan (Baku)', flag: '🇦🇿', reg: 'Asia', jur: 'Eurasia Node' },
  { id: 'bahamas', name: 'Bahamas (Nassau)', flag: '🇧🇸', reg: 'Americas', jur: 'Offshore Heaven' },
  { id: 'bahrain', name: 'Bahrain (Manama)', flag: '🇧🇭', reg: 'Asia', jur: 'Gulf Coop' },
  { id: 'bangladesh', name: 'Bangladesh (Dhaka)', flag: '🇧🇩', reg: 'Asia', jur: 'S. Asia Node' },
  { id: 'barbados', name: 'Barbados (Bridgetown)', flag: '🇧🇧', reg: 'Americas', jur: 'Offshore Haven' },
  { id: 'belarus', name: 'Belarus (Minsk)', flag: '🇧🇾', reg: 'Europe', jur: 'EEU Node' },
  { id: 'belgium', name: 'Belgium (Brussels)', flag: '🇧🇪', reg: 'Europe', jur: 'EU Court' },
  { id: 'belize', name: 'Belize (Belmopan)', flag: '🇧🇿', reg: 'Americas', jur: 'Offshore Heaven' },
  { id: 'benin', name: 'Benin (Porto-Novo)', flag: '🇧🇯', reg: 'Africa', jur: 'ECOWAS Jur' },
  { id: 'bhutan', name: 'Bhutan (Thimphu)', flag: '🇧🇹', reg: 'Asia', jur: 'Himalayan Node' },
  { id: 'bolivia', name: 'Bolivia (Sucre)', flag: '🇧🇴', reg: 'Americas', jur: 'Andean Union' },
  { id: 'bosnia', name: 'Bosnia & Herzegovina (Sarajevo)', flag: '🇧🇦', reg: 'Europe', jur: 'Balkan Court' },
  { id: 'botswana', name: 'Botswana (Gaborone)', flag: '🇧🇼', reg: 'Africa', jur: 'SADC Node' },
  { id: 'brazil', name: 'Brazil (Brasilia)', flag: '🇧🇷', reg: 'Americas', jur: 'LATAM Sovereign' },
  { id: 'brunei', name: 'Brunei (Bandar Seri Begawan)', flag: '🇧🇳', reg: 'Asia', jur: 'ASEAN Jur' },
  { id: 'bulgaria', name: 'Bulgaria (Sofia)', flag: '🇧🇬', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'burkina_faso', name: 'Burkina Faso (Ouagadougou)', flag: '🇧🇫', reg: 'Africa', jur: 'ECOWAS Node' },
  { id: 'burundi', name: 'Burundi (Gitega)', flag: '🇧🇮', reg: 'Africa', jur: 'EAC Jur' },
  { id: 'cambodia', name: 'Cambodia (Phnom Penh)', flag: '🇰🇭', reg: 'Asia', jur: 'ASEAN Node' },
  { id: 'cameroon', name: 'Cameroon (Yaounde)', flag: '🇨🇲', reg: 'Africa', jur: 'ECCAS Node' },
  { id: 'canada', name: 'Canada (Ottawa)', flag: '🇨🇦', reg: 'Americas', jur: 'CA Privacy' },
  { id: 'cape_verde', name: 'Cape Verde (Praia)', flag: '🇨🇻', reg: 'Africa', jur: 'Offshore Port' },
  { id: 'car', name: 'Central African Rep. (Bangui)', flag: '🇨🇫', reg: 'Africa', jur: 'ECCAS Node' },
  { id: 'chad', name: 'Chad (N\'Djamena)', flag: '🇹🇩', reg: 'Africa', jur: 'ECCAS Jur' },
  { id: 'cl', name: 'Chile (Santiago)', flag: '🇨🇱', reg: 'Americas', jur: 'S. American Coop' },
  { id: 'cn', name: 'China (Beijing)', flag: '🇨🇳', reg: 'Asia', jur: 'CN Firewall' },
  { id: 'co', name: 'Colombia (Bogota)', flag: '🇨🇴', reg: 'Americas', jur: 'Andean Node' },
  { id: 'comoros', name: 'Comoros (Moroni)', flag: '🇰🇲', reg: 'Africa', jur: 'Sovereign Node' },
  { id: 'congo', name: 'Congo (Brazzaville)', flag: '🇨🇬', reg: 'Africa', jur: 'ECCAS Node' },
  { id: 'costa_rica', name: 'Costa Rica (San Jose)', flag: '🇨🇷', reg: 'Americas', jur: 'Central America' },
  { id: 'croatia', name: 'Croatia (Zagreb)', flag: '🇭🇷', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'cuba', name: 'Cuba (Havana)', flag: '🇨🇺', reg: 'Americas', jur: 'Sovereign Court' },
  { id: 'cyprus', name: 'Cyprus (Nicosia)', flag: '🇨🇾', reg: 'Europe', jur: 'EU Court' },
  { id: 'czechia', name: 'Czechia (Prague)', flag: '🇨🇿', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'denmark', name: 'Denmark (Copenhagen)', flag: '🇩🇰', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'djibouti', name: 'Djibouti (Djibouti City)', flag: '🇩🇯', reg: 'Africa', jur: 'East Africa' },
  { id: 'dominica', name: 'Dominica (Roseau)', flag: '🇩🇲', reg: 'Americas', jur: 'Offshore Haven' },
  { id: 'dr', name: 'Dominican Republic (Santo Domingo)', flag: '🇩🇴', reg: 'Americas', jur: 'Carib Free Trade' },
  { id: 'east_timor', name: 'East Timor (Dili)', flag: '🇹🇱', reg: 'Oceania', jur: 'Sovereign Node' },
  { id: 'ecuador', name: 'Ecuador (Quito)', flag: '🇪🇨', reg: 'Americas', jur: 'Andean Court' },
  { id: 'egypt', name: 'Egypt (Cairo)', flag: '🇪🇬', reg: 'Africa', jur: 'Sovereign Middle-East' },
  { id: 'el_salvador', name: 'El Salvador (San Salvador)', flag: '🇸🇻', reg: 'Americas', jur: 'Bitcoin Haven' },
  { id: 'eq_guinea', name: 'Equatorial Guinea (Malabo)', flag: '🇬🇶', reg: 'Africa', jur: 'ECCAS Node' },
  { id: 'eritrea', name: 'Eritrea (Asmara)', flag: '🇪🇷', reg: 'Africa', jur: 'Sovereign Node' },
  { id: 'estonia', name: 'Estonia (Tallinn)', flag: '🇪🇪', reg: 'Europe', jur: 'EU/GDPR E-Gov' },
  { id: 'eswatini', name: 'Eswatini (Mbabane)', flag: '🇸🇿', reg: 'Africa', jur: 'SADC Jur' },
  { id: 'ethiopia', name: 'Ethiopia (Addis Ababa)', flag: '🇪🇹', reg: 'Africa', jur: 'AU HQ Node' },
  { id: 'fiji', name: 'Fiji (Suva)', flag: '🇫🇯', reg: 'Oceania', jur: 'Pacific Sovereign' },
  { id: 'finland', name: 'Finland (Helsinki)', flag: '🇫🇮', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'france', name: 'France (Paris)', flag: '🇫🇷', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'gabon', name: 'Gabon (Libreville)', flag: '🇬🇦', reg: 'Africa', jur: 'ECCAS Node' },
  { id: 'gambia', name: 'Gambia (Banjul)', flag: '🇬🇲', reg: 'Africa', jur: 'ECOWAS Node' },
  { id: 'georgia', name: 'Georgia (Tbilisi)', flag: '🇬🇪', reg: 'Asia', jur: 'Caucasus Jur' },
  { id: 'germany', name: 'Germany (Berlin)', flag: '🇩🇪', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'ghana', name: 'Ghana (Accra)', flag: '🇬🇭', reg: 'Africa', jur: 'ECOWAS Node' },
  { id: 'greece', name: 'Greece (Athens)', flag: '🇬🇷', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'grenada', name: 'Grenada (St. George\'s)', flag: '🇬🇩', reg: 'Americas', jur: 'Offshore Haven' },
  { id: 'guatemala', name: 'Guatemala (Guatemala City)', flag: '🇬🇹', reg: 'Americas', jur: 'Central America' },
  { id: 'guinea', name: 'Guinea (Conakry)', flag: '🇬🇳', reg: 'Africa', jur: 'ECOWAS Node' },
  { id: 'guinea_bissau', name: 'Guinea-Bissau (Bissau)', flag: '🇬🇼', reg: 'Africa', jur: 'ECOWAS Jur' },
  { id: 'guyana', name: 'Guyana (Georgetown)', flag: '🇬🇾', reg: 'Americas', jur: 'S. American Coop' },
  { id: 'haiti', name: 'Haiti (Port-au-Prince)', flag: '🇭🇹', reg: 'Americas', jur: 'Sovereign Node' },
  { id: 'honduras', name: 'Honduras (Tegucigalpa)', flag: '🇭🇳', reg: 'Americas', jur: 'Central America' },
  { id: 'hungary', name: 'Hungary (Budapest)', flag: '🇭🇺', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'iceland', name: 'Iceland (Reykjavik)', flag: '🇮🇸', reg: 'Europe', jur: 'EEA Non-EU' },
  { id: 'india', name: 'India (New Delhi)', flag: '🇮🇳', reg: 'Asia', jur: 'IN Privacy Law' },
  { id: 'indonesia', name: 'Indonesia (Jakarta)', flag: '🇮🇩', reg: 'Asia', jur: 'ASEAN Node' },
  { id: 'iran', name: 'Iran (Tehran)', flag: '🇮🇷', reg: 'Asia', jur: 'Sovereign Firewall' },
  { id: 'iraq', name: 'Iraq (Baghdad)', flag: '🇮🇶', reg: 'Asia', jur: 'Sovereign Node' },
  { id: 'ireland', name: 'Ireland (Dublin)', flag: '🇮🇪', reg: 'Europe', jur: 'EU/GDPR Hub' },
  { id: 'israel', name: 'Israel (Jerusalem)', flag: '🇮🇱', reg: 'Asia', jur: 'Middle-East Hub' },
  { id: 'italy', name: 'Italy (Rome)', flag: '🇮🇹', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'ivory_coast', name: 'Ivory Coast (Yamoussoukro)', flag: '🇨🇮', reg: 'Africa', jur: 'ECOWAS Jur' },
  { id: 'jamaica', name: 'Jamaica (Kingston)', flag: '🇯🇲', reg: 'Americas', jur: 'Carib Free Trade' },
  { id: 'japan', name: 'Japan (Tokyo)', flag: '🇯🇵', reg: 'Asia', jur: 'JP Cryptobank' },
  { id: 'jordan', name: 'Jordan (Amman)', flag: '🇯🇴', reg: 'Asia', jur: 'Middle-East Jur' },
  { id: 'kazakhstan', name: 'Kazakhstan (Astana)', flag: '🇰🇿', reg: 'Asia', jur: 'Eurasian Union' },
  { id: 'kenya', name: 'Kenya (Nairobi)', flag: '🇰🇪', reg: 'Africa', jur: 'East Africa Silicon' },
  { id: 'kiribati', name: 'Kiribati (Tarawa)', flag: '🇰🇮', reg: 'Oceania', jur: 'Sovereign Island' },
  { id: 'kosovo', name: 'Kosovo (Pristina)', flag: '🇽🇰', reg: 'Europe', jur: 'Balkans Jur' },
  { id: 'kuwait', name: 'Kuwait (Kuwait City)', flag: '🇰🇼', reg: 'Asia', jur: 'Gulf Coop' },
  { id: 'kyrgyzstan', name: 'Kyrgyzstan (Bishkek)', flag: '🇰🇬', reg: 'Asia', jur: 'Eurasian Node' },
  { id: 'laos', name: 'Laos (Vientiane)', flag: '🇱🇦', reg: 'Asia', jur: 'ASEAN Node' },
  { id: 'latvia', name: 'Latvia (Riga)', flag: '🇱🇻', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'lebanon', name: 'Lebanon (Beirut)', flag: '🇱🇧', reg: 'Asia', jur: 'Levant Node' },
  { id: 'lesotho', name: 'Lesotho (Maseru)', flag: '🇱🇸', reg: 'Africa', jur: 'SADC Node' },
  { id: 'liberia', name: 'Liberia (Monrovia)', flag: '🇱🇷', reg: 'Africa', jur: 'Sovereign Node' },
  { id: 'libya', name: 'Libya (Tripoli)', flag: '🇱🇾', reg: 'Africa', jur: 'Sovereign Node' },
  { id: 'liechtenstein', name: 'Liechtenstein (Vaduz)', flag: '🇱🇮', reg: 'Europe', jur: 'Sovereign Bank Jur' },
  { id: 'lithuania', name: 'Lithuania (Vilnius)', flag: '🇱🇹', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'luxembourg', name: 'Luxembourg (Luxembourg City)', flag: '🇱🇺', reg: 'Europe', jur: 'EU Financial Court' },
  { id: 'madagascar', name: 'Madagascar (Antananarivo)', flag: '🇲🇬', reg: 'Africa', jur: 'Sovereign Island' },
  { id: 'malawi', name: 'Malawi (Lilongwe)', flag: '🇲🇼', reg: 'Africa', jur: 'SADC Node' },
  { id: 'malaysia', name: 'Malaysia (Kuala Lumpur)', flag: '🇲🇾', reg: 'Asia', jur: 'ASEAN Node' },
  { id: 'maldives', name: 'Maldives (Male)', flag: '🇲🇻', reg: 'Asia', jur: 'Offshore Haven' },
  { id: 'mali', name: 'Mali (Bamako)', flag: '🇲🇱', reg: 'Africa', jur: 'ECOWAS Jur' },
  { id: 'malta', name: 'Malta (Valletta)', flag: '🇲🇹', reg: 'Europe', jur: 'EU/GDPR Haven' },
  { id: 'marshall_islands', name: 'Marshall Islands (Majuro)', flag: '🇲🇭', reg: 'Oceania', jur: 'Offshore Haven' },
  { id: 'mauritania', name: 'Mauritania (Nouakchott)', flag: '🇲🇷', reg: 'Africa', jur: 'AU Sovereign' },
  { id: 'mauritius', name: 'Mauritius (Port Louis)', flag: '🇲🇺', reg: 'Africa', jur: 'Offshore Haven' },
  { id: 'mexico', name: 'Mexico (Mexico City)', flag: '🇲🇽', reg: 'Americas', jur: 'Latin America Core' },
  { id: 'micronesia', name: 'Micronesia (Palikir)', flag: '🇫🇲', reg: 'Oceania', jur: 'Sovereign Node' },
  { id: 'moldova', name: 'Moldova (Chisinau)', flag: '🇲🇩', reg: 'Europe', jur: 'East Europe Node' },
  { id: 'monaco', name: 'Monaco (Monaco)', flag: '🇲🇨', reg: 'Europe', jur: 'Sovereign Bank' },
  { id: 'mongolia', name: 'Mongolia (Ulaanbaatar)', flag: '🇲🇳', reg: 'Asia', jur: 'Steppe Sovereign' },
  { id: 'montenegro', name: 'Montenegro (Podgorica)', flag: '🇲🇪', reg: 'Europe', jur: 'Balkan Node' },
  { id: 'morocco', name: 'Morocco (Rabat)', flag: '🇲🇦', reg: 'Africa', jur: 'North Africa Node' },
  { id: 'mozambique', name: 'Mozambique (Maputo)', flag: '🇲🇿', reg: 'Africa', jur: 'SADC Node' },
  { id: 'myanmar', name: 'Myanmar (Naypyidaw)', flag: '🇲🇲', reg: 'Asia', jur: 'Sovereign Court' },
  { id: 'namibia', name: 'Namibia (Windhoek)', flag: '🇳🇦', reg: 'Africa', jur: 'SADC Node' },
  { id: 'nauru', name: 'Nauru (Yaren)', flag: '🇳🇷', reg: 'Oceania', jur: 'Sovereign Island' },
  { id: 'nepal', name: 'Nepal (Kathmandu)', flag: '🇳🇵', reg: 'Asia', jur: 'Himalayan Node' },
  { id: 'netherlands', name: 'Netherlands (Amsterdam)', flag: '🇳🇱', reg: 'Europe', jur: 'EU/GDPR Core' },
  { id: 'new_zealand', name: 'New Zealand (Wellington)', flag: '🇳🇿', reg: 'Oceania', jur: 'NZ Privacy' },
  { id: 'nicaragua', name: 'Nicaragua (Managua)', flag: '🇳🇮', reg: 'Americas', jur: 'Sovereign Node' },
  { id: 'niger', name: 'Niger (Niamey)', flag: '🇳🇪', reg: 'Africa', jur: 'ECOWAS Node' },
  { id: 'nigeria', name: 'Nigeria (Abuja)', flag: '🇳🇬', reg: 'Africa', jur: 'West Africa Hub' },
  { id: 'north_korea', name: 'North Korea (Pyongyang)', flag: '🇰🇵', reg: 'Asia', jur: 'Isolation Grid' },
  { id: 'macedonia', name: 'North Macedonia (Skopje)', flag: '🇲🇰', reg: 'Europe', jur: 'Balkans Jur' },
  { id: 'norway', name: 'Norway (Oslo)', flag: '🇳🇴', reg: 'Europe', jur: 'EEA Privacy' },
  { id: 'oman', name: 'Oman (Muscat)', flag: '🇴🇲', reg: 'Asia', jur: 'Gulf Coop' },
  { id: 'pakistan', name: 'Pakistan (Islamabad)', flag: '🇵🇰', reg: 'Asia', jur: 'Sovereign Node' },
  { id: 'palau', name: 'Palau (Ngerulmud)', flag: '🇵🇼', reg: 'Oceania', jur: 'Pacific Sovereign' },
  { id: 'palestine', name: 'Palestine (East Jerusalem)', flag: '🇵🇸', reg: 'Asia', jur: 'Sovereign Node' },
  { id: 'panama', name: 'Panama (Panama City)', flag: '🇵🇦', reg: 'Americas', jur: 'Canal Haven' },
  { id: 'papua', name: 'Papua New Guinea (Port Moresby)', flag: '🇵🇬', reg: 'Oceania', jur: 'Pacific Sovereign' },
  { id: 'paraguay', name: 'Paraguay (Asuncion)', flag: '🇵🇾', reg: 'Americas', jur: 'LATAM Node' },
  { id: 'peru', name: 'Peru (Lima)', flag: '🇵🇪', reg: 'Americas', jur: 'Andean Union' },
  { id: 'philippines', name: 'Philippines (Manila)', flag: '🇵🇭', reg: 'Asia', jur: 'ASEAN Node' },
  { id: 'poland', name: 'Poland (Warsaw)', flag: '🇵🇱', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'portugal', name: 'Portugal (Lisbon)', flag: '🇵🇹', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'qatar', name: 'Qatar (Doha)', flag: '🇶🇦', reg: 'Asia', jur: 'Gulf Coop' },
  { id: 'romania', name: 'Romania (Bucharest)', flag: '🇷🇴', reg: 'Europe', jur: 'EU No-Logs Mandate' },
  { id: 'russia', name: 'Russia (Moscow)', flag: '🇷🇺', reg: 'Asia', jur: 'RU Encryption' },
  { id: 'rwanda', name: 'Rwanda (Kigali)', flag: '🇷🇼', reg: 'Africa', jur: 'East Africa Core' },
  { id: 'st_kitts', name: 'Saint Kitts & Nevis (Basseterre)', flag: '🇰🇳', reg: 'Americas', jur: 'Offshore Haven' },
  { id: 'st_lucia', name: 'Saint Lucia (Castries)', flag: '🇱🇨', reg: 'Americas', jur: 'Offshore Haven' },
  { id: 'st_vincent', name: 'Saint Vincent (Kingstown)', flag: '🇻🇨', reg: 'Americas', jur: 'Offshore Haven' },
  { id: 'samoa', name: 'Samoa (Apia)', flag: '🇼🇸', reg: 'Oceania', jur: 'Pacific Sovereign' },
  { id: 'san_marino', name: 'San Marino (San Marino)', flag: '🇸🇲', reg: 'Europe', jur: 'Sovereign Enclave' },
  { id: 'sao_tome', name: 'Sao Tome & Principe (Sao Tome)', flag: '🇸🇹', reg: 'Africa', jur: 'Atlantic Node' },
  { id: 'saudi_arabia', name: 'Saudi Arabia (Riyadh)', flag: '🇸🇦', reg: 'Asia', jur: 'Gulf Coop Core' },
  { id: 'senegal', name: 'Senegal (Dakar)', flag: '🇸🇳', reg: 'Africa', jur: 'ECOWAS Node' },
  { id: 'serbia', name: 'Serbia (Belgrade)', flag: '🇷🇸', reg: 'Europe', jur: 'Balkans Sovereign' },
  { id: 'seychelles', name: 'Seychelles (Victoria)', flag: '🇸🇨', reg: 'Africa', jur: 'Offshore Hub' },
  { id: 'sierra_leone', name: 'Sierra Leone (Freetown)', flag: '🇸🇱', reg: 'Africa', jur: 'ECOWAS Node' },
  { id: 'singapore', name: 'Singapore (Singapore)', flag: '🇸🇬', reg: 'Asia', jur: 'SG Encryption' },
  { id: 'slovakia', name: 'Slovakia (Bratislava)', flag: '🇸🇰', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'slovenia', name: 'Slovenia (Ljubljana)', flag: '🇸🇮', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'solomon_islands', name: 'Solomon Islands (Honiara)', flag: '🇸🇧', reg: 'Oceania', jur: 'Pacific Sovereign' },
  { id: 'somalia', name: 'Somalia (Mogadishu)', flag: '🇸🇴', reg: 'Africa', jur: 'Sovereign Node' },
  { id: 'south_africa', name: 'South Africa (Pretoria)', flag: '🇿🇦', reg: 'Africa', jur: 'Sovereign Southern Hub' },
  { id: 'south_korea', name: 'South Korea (Seoul)', flag: '🇰🇷', reg: 'Asia', jur: 'KR Cybernetic' },
  { id: 'south_sudan', name: 'South Sudan (Juba)', flag: '🇸🇸', reg: 'Africa', jur: 'EAC Node' },
  { id: 'spain', name: 'Spain (Madrid)', flag: '🇪🇸', reg: 'Europe', jur: 'EU/GDPR' },
  { id: 'sri_lanka', name: 'Sri Lanka (Colombo)', flag: '🇱🇰', reg: 'Asia', jur: 'Sovereign Indian-Ocean' },
  { id: 'sudan', name: 'Sudan (Khartoum)', flag: '🇸🇩', reg: 'Africa', jur: 'AU Sovereign' },
  { id: 'suriname', name: 'Suriname (Paramaribo)', flag: '🇸🇷', reg: 'Americas', jur: 'Sovereign Node' },
  { id: 'sweden', name: 'Sweden (Stockholm)', flag: '🇸🇪', reg: 'Europe', jur: 'EU Zero-Logs' },
  { id: 'switzerland', name: 'Switzerland (Zurich)', flag: '🇨🇭', reg: 'Europe', jur: 'Swiss Fed Crypto' },
  { id: 'syria', name: 'Syria (Damascus)', flag: '🇸🇾', reg: 'Asia', jur: 'Isolation Core' },
  { id: 'taiwan', name: 'Taiwan (Taipei)', flag: '🇹🇼', reg: 'Asia', jur: 'TW Silicon Shield' },
  { id: 'tajikistan', name: 'Tajikistan (Dushanbe)', flag: '🇹🇯', reg: 'Asia', jur: 'Eurasian Union' },
  { id: 'tanzania', name: 'Tanzania (Dodoma)', flag: '🇹🇿', reg: 'Africa', jur: 'EAC Node' },
  { id: 'thailand', name: 'Thailand (Bangkok)', flag: '🇹🇭', reg: 'Asia', jur: 'ASEAN Node' },
  { id: 'togo', name: 'Togo (Lome)', flag: '🇹🇬', reg: 'Africa', jur: 'ECOWAS Node' },
  { id: 'tonga', name: 'Tonga (Nuku\'alofa)', flag: '🇹🇴', reg: 'Oceania', jur: 'Pacific Sovereign' },
  { id: 'trinidad', name: 'Trinidad & Tobago (Port of Spain)', flag: '🇹🇹', reg: 'Americas', jur: 'Carib Free Trade' },
  { id: 'tunisia', name: 'Tunisia (Tunis)', flag: '🇹🇳', reg: 'Africa', jur: 'AU Sovereign' },
  { id: 'turkey', name: 'Turkey (Ankara)', flag: '🇹🇷', reg: 'Asia', jur: 'Bosphorus Hub' },
  { id: 'turkmenistan', name: 'Turkmenistan (Ashgabat)', flag: '🇹🇲', reg: 'Asia', jur: 'Eurasian Node' },
  { id: 'tuvalu', name: 'Tuvalu (Funafuti)', flag: '🇹🇻', reg: 'Oceania', jur: 'Sovereign Island' },
  { id: 'uganda', name: 'Uganda (Kampala)', flag: '🇺🇬', reg: 'Africa', jur: 'EAC Node' },
  { id: 'ukraine', name: 'Ukraine (Kyiv)', flag: '🇺🇦', reg: 'Europe', jur: 'UA Security' },
  { id: 'uae', name: 'United Arab Emirates (Abu Dhabi)', flag: '🇦🇪', reg: 'Asia', jur: 'UAE Smartcity Hub' },
  { id: 'uk', name: 'United Kingdom (London)', flag: '🇬🇧', reg: 'Europe', jur: 'UK Privacy' },
  { id: 'usa', name: 'United States (Oregon)', flag: '🇺🇸', reg: 'Americas', jur: 'US Jurisdiction' },
  { id: 'uruguay', name: 'Uruguay (Montevideo)', flag: '🇺🇾', reg: 'Americas', jur: 'LATAM Node' },
  { id: 'uzbekistan', name: 'Uzbekistan (Tashkent)', flag: '🇺🇿', reg: 'Asia', jur: 'Eurasian Court' },
  { id: 'vanuatu', name: 'Vanuatu (Port Vila)', flag: '🇻🇺', reg: 'Oceania', jur: 'Offshore Haven' },
  { id: 'vatican', name: 'Vatican City (Vatican)', flag: '🇻🇦', reg: 'Europe', jur: 'Holy See Node' },
  { id: 'venezuela', name: 'Venezuela (Caracas)', flag: '🇻🇪', reg: 'Americas', jur: 'Sovereign Node' },
  { id: 'vietnam', name: 'Vietnam (Hanoi)', flag: '🇻🇳', reg: 'Asia', jur: 'ASEAN Silicon' },
  { id: 'yemen', name: 'Yemen (Sanaa)', flag: '🇾🇪', reg: 'Asia', jur: 'Sovereign Node' },
  { id: 'zambia', name: 'Zambia (Lusaka)', flag: '🇿🇲', reg: 'Africa', jur: 'SADC Node' },
  { id: 'zimbabwe', name: 'Zimbabwe (Harare)', flag: '🇿🇼', reg: 'Africa', jur: 'SADC Node' }
];

const getStableIpForCountry = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const o1 = Math.abs((hash) % 220) + 12;
  const o2 = Math.abs((hash >> 8) % 254) + 1;
  const o3 = Math.abs((hash >> 16) % 254) + 1;
  const o4 = Math.abs((hash >> 24) % 254) + 1;
  return `${o1}.${o2}.${o3}.${o4}`;
};

const vpnServers = countriesData.map((c) => {
  let hash = 0;
  for (let i = 0; i < c.id.length; i++) {
    hash = c.id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const load = Math.abs((hash) % 76) + 10; // stable load 10% to 85%
  
  // latency based on region
  let baseLatency = 20;
  if (c.reg === 'Europe') baseLatency = 12 + Math.abs(hash % 18);
  else if (c.reg === 'Americas') baseLatency = 25 + Math.abs(hash % 30);
  else if (c.reg === 'Asia') baseLatency = 65 + Math.abs(hash % 50);
  else if (c.reg === 'Africa') baseLatency = 95 + Math.abs(hash % 60);
  else if (c.reg === 'Oceania') baseLatency = 130 + Math.abs(hash % 80);
  
  const latency = baseLatency;
  
  const speeds = ['GigaNode', 'Premium Transit', '10 Gbps Ultra', 'High Speed', 'Turbo Tunnel'];
  const speed = speeds[Math.abs(hash >> 2) % speeds.length];
  
  const qualities = ['Zero Logs', 'Ultra Privacy', 'Military Grade', 'DMCA Exempt', 'Crypto Haven', 'Fully Encrypted', 'Security Core'];
  const quality = qualities[Math.abs(hash >> 4) % qualities.length];

  return {
    id: c.id,
    name: c.name,
    ip: getStableIpForCountry(c.id),
    flag: c.flag,
    quality,
    speed,
    load,
    latency,
    jurisdiction: c.jur,
    region: c.reg
  };
});

export default function LinuxSoftware({ user, onOpenAuth, onOpenPricing }: LinuxSoftwareProps) {
  const [terminalTheme, setTerminalTheme] = useState<'ubuntu' | 'classic' | 'cyberpunk' | 'matrix' | 'monokai' | 'kali'>('ubuntu');
  const [activeTab, setActiveTab] = useState<'terminal' | 'store'>('terminal');
  const [activeWindowApp, setActiveWindowApp] = useState<string | null>(null);

  // Windows 11 Pro Simulator States
  const [win11StartMenuOpen, setWin11StartMenuOpen] = useState(false);
  const [win11ActiveApp, setWin11ActiveApp] = useState<string | null>(null);
  const [win11CmdLines, setWin11CmdLines] = useState<string[]>([
    'Microsoft Windows [Version 10.0.22631.3296]',
    '(c) Microsoft Corporation. All rights reserved.',
    '',
    'C:\\Users\\UltraUser>'
  ]);
  const [win11CmdInput, setWin11CmdInput] = useState('');
  const [win11NotepadText, setWin11NotepadText] = useState('Welcome to Windows 11 Pro Lifetime Edition!\nThis environment is permanently activated under your Ultra Premium license.');
  const [win11SearchQuery, setWin11SearchQuery] = useState('');
  const [win11SearchLoading, setWin11SearchLoading] = useState(false);
  const [win11SearchResults, setWin11SearchResults] = useState<string[]>([]);
  const [showWindowsUpgradePrompt, setShowWindowsUpgradePrompt] = useState(false);

  // Desktop-Mode States
  const [desktopActiveApp, setDesktopActiveApp] = useState<string | null>(null);
  const [desktopStartMenuOpen, setDesktopStartMenuOpen] = useState(false);
  const [desktopFileView, setDesktopFileView] = useState<string | null>(null);
  const [desktopNewFileName, setDesktopNewFileName] = useState('');
  const [desktopNewFileContent, setDesktopNewFileContent] = useState('');
  const [desktopSearchQuery, setDesktopSearchQuery] = useState('');
  const [desktopSearchLoading, setDesktopSearchLoading] = useState(false);
  const [desktopSearchResults, setDesktopSearchResults] = useState<string[]>([]);

  // iOS 26 Simulator States
  const [iosUnlocked, setIosUnlocked] = useState(false);
  const [iosActiveApp, setIosActiveApp] = useState<string | null>(null);
  const [iosSiriInput, setIosSiriInput] = useState('');
  const [iosSiriLines, setIosSiriLines] = useState<string[]>([
    'Siri 10.0: Hello! I am your futuristic Siri, powered by Gemini holographic consciousness. How can I help you in 2026?'
  ]);
  const [iosHoloProjector, setIosHoloProjector] = useState(true);
  const [iosNeuralSync, setIosNeuralSync] = useState(false);
  const [iosSpaceNet, setIosSpaceNet] = useState(true);
  const [iosSiriLoading, setIosSiriLoading] = useState(false);

  const handleIosSiriSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = iosSiriInput.trim();
    if (!query) return;

    setIosSiriLines(prev => [...prev, `User: ${query}`]);
    setIosSiriInput('');
    setIosSiriLoading(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();
      if (lower.includes('hello') || lower.includes('hi')) {
        reply = 'Siri 10.0: Hey there! Beautiful day in 2026. My quantum neural links are running at 98.7% coherence. What futuristic task shall we tackle?';
      } else if (lower.includes('ios 26') || lower.includes('version') || lower.includes('new')) {
        reply = 'Siri 10.0: iOS 26 introduces sub-atomic thermal computing, fully integrated neural holographic projections, and direct mental synching. It runs 120,000x faster than iOS 18!';
      } else if (lower.includes('weather')) {
        reply = 'Siri 10.0: The geo-engineering satellites indicate a perfect 72°F across all main cities today, with a 0% chance of acid rain or solar flares.';
      } else if (lower.includes('crypto') || lower.includes('wallet') || lower.includes('quantum')) {
        reply = 'Siri 10.0: Checking your Quantum Wallet... You currently hold 14.52 Q-Bitcoins and 28,400 Sol-Credits. Market trend is highly positive!';
      } else {
        reply = `Siri 10.0: I've run a localized semantic search for "${query}". Our futuristic 2026 cloud-net suggests: This is fully compliant with the Gemini Nova core architecture! Let's build something grand.`;
      }
      setIosSiriLines(prev => [...prev, reply]);
      setIosSiriLoading(false);
    }, 1000);
  };

  // Windows 11 Command Prompt Parser
  const handleWin11CmdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = win11CmdInput.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: string[] = [];

    switch (command) {
      case 'cls':
      case 'clear':
        setWin11CmdLines([]);
        setWin11CmdInput('');
        return;
      case 'help':
        output = [
          'Microsoft Windows 11 Help command interface:',
          '==================================================',
          'HELP         - Show list of active CMD commands',
          'CLS          - Wipe the console screen buffer',
          'VER          - Display current Windows kernel build version',
          'DIR          - List files in current user directory',
          'SYSTEMINFO   - Fetch hardware specification metadata metrics',
          'IPCONFIG     - View simulated network interface card configurations',
          'PING <host>  - Send ICMP echo requests to internet servers',
          'LICENSE      - Display Windows Pro active lifetime digital product key',
          'COPTALK <txt>- Prompt local AI Copilot helper immediately',
          'EXIT         - Shutdown command prompt session'
        ];
        break;
      case 'ver':
        output = ['Microsoft Windows [Version 10.0.22631.3296]'];
        break;
      case 'dir':
        output = [
          ' Volume in drive C has no label.',
          ' Volume Serial Number is 1F2E-3D4C',
          '',
          ' Directory of C:\\Users\\UltraUser',
          '',
          '07/20/2026  10:45 AM    <DIR>          .',
          '07/20/2026  10:45 AM    <DIR>          ..',
          '07/20/2026  10:45 AM    <DIR>          Desktop',
          '07/20/2026  10:45 AM    <DIR>          Documents',
          '07/20/2026  10:45 AM    <DIR>          Downloads',
          '07/20/2026  10:45 AM               142 notepad_draft.txt',
          '               1 File(s)            142 bytes',
          '               5 Dir(s)  421,982,112,000 bytes free'
        ];
        break;
      case 'systeminfo':
        output = [
          'Host Name:                 NOVA-PC-PRO',
          'OS Name:                   Microsoft Windows 11 Pro',
          'OS Version:                10.0.22631 N/A Build 22631',
          'OS Manufacturer:           Microsoft Corporation',
          'OS Configuration:          Standalone Workstation',
          'OS Build Type:             Multiprocessor Free',
          'Registered Owner:          Ultra Premium VIP',
          'Product ID:                00330-80000-00000-AA612',
          'Original Install Date:     07/20/2026, 10:41:52 AM',
          'System Boot Time:          ' + new Date(Date.now() - 3600000).toLocaleString(),
          'System Manufacturer:       Nova Virtualization Platform',
          'System Model:              Hyper-V Virtual Machine',
          'System Type:               x64-based PC',
          'Processor(s):              1 Processor(s) Installed.',
          '                           [01]: Intel64 Family 6 Model 158 Stepping 13 GenuineIntel ~3601 Mhz',
          'BIOS Version:              NovaOS CoreBIOS v5.2, 04/12/2026',
          'Total Physical Memory:     16,384 MB',
          'Available Physical Memory: 11,280 MB',
          'Virtual Memory: Max Size:  18,688 MB'
        ];
        break;
      case 'ipconfig':
        output = [
          'Windows IP Configuration',
          '',
          'Ethernet adapter vEthernet (Default Switch):',
          '   Connection-specific DNS Suffix  . : localdomain',
          '   IPv6 Address. . . . . . . . . . . : fe80::59cd:12fa:4e51:2b1c%4',
          '   IPv4 Address. . . . . . . . . . . : 172.18.96.1',
          '   Subnet Mask . . . . . . . . . . . : 255.255.240.0',
          '   Default Gateway . . . . . . . . . : 172.18.96.1'
        ];
        break;
      case 'ping':
        const target = args[0] || '1.1.1.1';
        output = [
          `Pinging ${target} with 32 bytes of data:`,
          `Reply from ${target}: bytes=32 time=4ms TTL=128`,
          `Reply from ${target}: bytes=32 time=5ms TTL=128`,
          `Reply from ${target}: bytes=32 time=3ms TTL=128`,
          `Reply from ${target}: bytes=32 time=4ms TTL=128`,
          '',
          `Ping statistics for ${target}:`,
          `    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),`,
          `Approximate round trip times in milli-seconds:`,
          `    Minimum = 3ms, Maximum = 5ms, Average = 4ms`
        ];
        break;
      case 'license':
        output = [
          'PRODUCT KEY STATUS AUDIT:',
          '=======================================',
          'Product Name: Windows(R) Operating System, VOLUME_KMSCLIENT channel',
          'Partial Product Key: T83GX',
          'License Status: Permanently Licensed (Genuine Retail digital link)',
          'Product Key: W269N-WFGWX-YVC9B-4J6C9-T83GX',
          'Lifetime ownership verified for premium user: ' + (user?.email || 'Ultra VIP')
        ];
        break;
      case 'coptalk':
        const talkQuery = args.join(' ');
        if (!talkQuery) {
          output = ['Error: Missing dialogue argument. Usage: coptalk <your question>'];
        } else {
          output = [
            '[Copilot AI Link]: Searching neural indices...',
            `Answer to "${talkQuery}": Windows 11 Pro Lifetime Edition is fully licensed and running inside a high-speed QEMU sandbox hypervisor mapped with full direct-hardware hardware acceleration bounds. Ask anything to optimize your daily workflow!`
          ];
        }
        break;
      case 'exit':
        setWin11ActiveApp(null);
        setWin11CmdInput('');
        return;
      default:
        output = [
          `'${trimmed}' is not recognized as an internal or external command,`,
          'operable program or batch file. Type "help" to see available commands.'
        ];
    }

    setWin11CmdLines(prev => [
      ...prev,
      `C:\\Users\\UltraUser>${trimmed}`,
      ...output,
      ''
    ]);
    setWin11CmdInput('');
  };

  // Windows 11 Search / Edge Bing AI Query
  const handleWin11Search = (e: React.FormEvent) => {
    e.preventDefault();
    const query = win11SearchQuery.trim();
    if (!query) return;

    setWin11SearchLoading(true);

    setTimeout(() => {
      let results: string[] = [];
      const lower = query.toLowerCase();

      if (lower.includes('license') || lower.includes('key') || lower.includes('activate')) {
        results = [
          `🔍 Microsoft Copilot response on "Licensing & Activation":`,
          `• Your Windows 11 Pro instance is pre-activated using our genuine Retail Digital license key.`,
          `• Digital Product Key: W269N-WFGWX-YVC9B-4J6C9-T83GX`,
          `• Subscription linkage: Verified permanently tied to user ${user?.email || 'Ultra VIP'}.`,
          `• Features enabled: Full BitLocker, Hyper-V virtual sandbox and premium system configurations.`
        ];
      } else if (lower.includes('spec') || lower.includes('core') || lower.includes('system') || lower.includes('ram')) {
        results = [
          `🔍 Microsoft Copilot response on "System Virtual Hardware Specs":`,
          `• Environment: QEMU Hyper-V Sandbox virtual machine running inside NovaOS Linux host.`,
          `• Allocations: 4 Dedicated Intel Xeon CPU Cores, 8GB high-density RAM buffer space.`,
          `• Network: Bridged 10Gbps Ethernet NIC virtualization.`
        ];
      } else {
        results = [
          `🔍 Microsoft Copilot Answer to "${query}":`,
          `• Here is what I found for you: Running Windows 11 Pro Lifetime edition inside NovaOS represents the ultimate pinnacle of productivity integration.`,
          `• Actionable Tip: Try opening the "Command Prompt" tool from your desktop and typing "help" or "systeminfo" to inspect the simulated virtual workstation's hardware layer.`,
          `• Store details: You can also open the "Store" application to see which office suites and developer modules come bundled preloaded for free on this Ultra Premium account tier.`
        ];
      }

      setWin11SearchResults(results);
      setWin11SearchLoading(false);
    }, 1200);
  };

  // Simulated metrics
  const [cpuUsage, setCpuUsage] = useState(14);
  const [ramUsage, setRamUsage] = useState(1.42);
  const [uptime, setUptime] = useState('2h 45m 12s');

  const [fileSystem, setFileSystem] = useState<FileSystem>(() => {
    return {
      'welcome.txt': 'Welcome to NovaOS v24.04 (LTS)!\nType "help" to see what commands you can execute.\nUse "ask-ai <question>" to brainstorm bash scripts or code directly with Gemini.',
      'script.py': 'def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Root User")\n',
      'system_info.json': '{\n  "os": "NovaOS-Linux",\n  "version": "24.04-LTS"\n}'
    };
  });

  const [packages, setPackages] = useState<InstalledPackage[]>([
    { id: 'neofetch', name: 'neofetch', version: '7.1.0', description: 'A CLI system information tool written in bash', category: 'Utilities', size: '256 KB', isInstalled: true, command: 'neofetch' },
    { id: 'htop', name: 'htop', version: '3.3.0', description: 'Interactive process viewer and system statistics monitor', category: 'Utilities', size: '512 KB', isInstalled: true, command: 'htop' },
    { id: 'nano', name: 'nano-editor', version: '8.0.1', description: 'A lightweight and easy-to-use command-line text editor', category: 'Utilities', size: '420 KB', isInstalled: true, command: 'nano' },
    { id: 'python', name: 'python3-ide', version: '3.12.3', description: 'Simulated Python 3 development and fast execution workspace', category: 'Development', size: '12 MB', isInstalled: false, command: 'python3' },
    { id: 'matrix', name: 'matrix-saver', version: '2.4.0', description: 'An elegant cascading matrix digital rain Canvas screensaver', category: 'Graphics', size: '1.2 MB', isInstalled: false, command: 'matrix' },
    { id: 'snake', name: 'snake-game', version: '1.0.3', description: 'Playable retro console-style keyboard snake game in bash', category: 'Games', size: '800 KB', isInstalled: false, command: 'snake' },
    { id: 'docker', name: 'docker-sim', version: '26.1.1', description: 'Container builder, runner, and orchestrator simulation panel', category: 'Infrastructure', size: '15 MB', isInstalled: false, command: 'docker' },
    { id: 'network', name: 'network-scanner', version: '1.8.2', description: 'High performance IP sweep scanner and open-port vulnerable auditor', category: 'Diagnostics', size: '2.5 MB', isInstalled: false, command: 'network' },
    { id: 'nmap', name: 'nmap', version: '7.94', description: 'Advanced network exploration and port scanner (Network Mapper)', category: 'Diagnostics', size: '4.8 MB', isInstalled: false, command: 'nmap' },
    { id: 'masscan', name: 'masscan', version: '1.3.2', description: 'Extremely fast TCP port scanner, scanning the entire internet in under 6 minutes', category: 'Security (Kali)', size: '1.2 MB', isInstalled: false, command: 'masscan' },
    { id: 'metasploit', name: 'metasploit-framework', version: '6.4.1', description: 'Kali Penetration testing framework containing exploits, payloads, and encoders', category: 'Security (Kali)', size: '28 MB', isInstalled: false, command: 'msfconsole' },
    { id: 'hydra', name: 'hydra-crack', version: '9.5', description: 'Kali multi-threaded parallelized login brute-force cracker supporting SSH, FTP, HTTP', category: 'Security (Kali)', size: '1.8 MB', isInstalled: false, command: 'hydra' },
    { id: 'john', name: 'john-the-ripper', version: '1.9.0', description: 'Kali cryptographic password cracker dictionary and rule-based optimizer', category: 'Security (Kali)', size: '3.1 MB', isInstalled: false, command: 'john' },
    { id: 'wireshark', name: 'wireshark-gui', version: '4.2.0', description: 'Kali interactive packet capture, real-time decoder and visual protocol sniffer', category: 'Security (Kali)', size: '32 MB', isInstalled: false, command: 'wireshark' },
    { id: 'nethunter', name: 'kali-nethunter', version: '2024.2', description: 'Kali NetHunter mobile penetration testing platform interface simulation', category: 'Security (Kali)', size: '18 MB', isInstalled: false, command: 'nethunter' },
    { id: 'windows11', name: 'windows11-pro', version: 'Lifetime', description: 'Windows 11 Pro Lifetime Edition simulation workspace & product launcher [Ultra Premium Elite Exclusive]', category: 'Operating Systems', size: '4.8 GB', isInstalled: false, command: 'win11' },
    { id: 'desktop', name: 'desktop-mode', version: '24.04', description: 'A gorgeous simulated graphical GNOME Linux desktop environment with widgets, web browsing, and custom file manager explorer', category: 'Operating Systems', size: '1.8 GB', isInstalled: false, command: 'desktop' },
    { id: 'ios26', name: 'ios26-simulator', version: '26.0', description: 'Holographic interactive Apple iOS 26 mobile OS environment simulator on a titanium iPhone device chassis', category: 'Operating Systems', size: '2.4 GB', isInstalled: false, command: 'ios26' },
    { id: 'tor', name: 'tor-browser', version: '13.5.1', description: 'The Onion Router secure web browser, routing traffic through the decentralized, multi-layered encrypted Tor network for maximum anonymity', category: 'Security (Kali)', size: '28 MB', isInstalled: false, command: 'tor' },
    { id: 'vpn', name: 'wireguard-vpn', version: '2.4.5', description: 'Cryptographic WireGuard & OpenVPN client. Secures your digital footprint via multi-hop offshore tunneling with real-time performance analytics.', category: 'Security (Kali)', size: '12 MB', isInstalled: false, command: 'vpn' }
  ]);

  const [isInstalling, setIsInstalling] = useState<string | null>(null);
  const [installProgress, setInstallProgress] = useState(0);
  const [installLogs, setInstallLogs] = useState<string[]>([]);

  // Shell States
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { type: 'header', text: 'Welcome to NovaOS 24.04 LTS (GNU/Linux 6.8.0-45-generic x86_64)' },
    { type: 'system', text: ' * Support: Enterprise Premium Active AI Tier' },
    { type: 'system', text: ' * Interactive shell loaded. Type "help" to start.' },
    { type: 'success', text: 'Tip: Type "ask-ai <question>" to query real Gemini AI server-side!' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>(['neofetch', 'help']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isShellWaiting, setIsShellWaiting] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // GUI Windows
  const [nanoFilename, setNanoFilename] = useState('');
  const [nanoContent, setNanoContent] = useState('');

  // htop
  const [htopProcesses, setHtopProcesses] = useState<any[]>([
    { pid: 1, name: 'systemd', cpu: 0.1, mem: 0.2, user: 'root' },
    { pid: 85, name: 'systemd-journald', cpu: 0.2, mem: 1.1, user: 'root' },
    { pid: 210, name: 'dockerd', cpu: 0.5, mem: 3.4, user: 'root' },
    { pid: 312, name: 'nginx-proxy', cpu: 0.2, mem: 1.8, user: 'www-data' },
    { pid: 520, name: 'node-dev-server', cpu: 1.2, mem: 5.6, user: 'root' },
    { pid: 742, name: 'gemini-agent-link', cpu: 0.8, mem: 4.2, user: 'root' },
    { pid: 1024, name: 'htop', cpu: 1.5, mem: 1.2, user: 'root' }
  ]);
  const [selectedPid, setSelectedPid] = useState<number | null>(null);

  // Python IDE
  const [pythonCode, setPythonCode] = useState('print("Executing calculations...")\nfor i in range(1, 5):\n    print(f"Step {i} Result: {i * 10.5}")');
  const [pythonOutputs, setPythonOutputs] = useState<string[]>([]);
  const [isPythonRunning, setIsPythonRunning] = useState(false);

  // Snake
  const [snake, setSnake] = useState<{ x: number, y: number }[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<{ x: number, y: number }>({ x: 5, y: 5 });
  const [snakeDirection, setSnakeDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeGameOver, setSnakeGameOver] = useState(false);
  const snakeIntervalRef = useRef<any>(null);

  // Docker
  const [dockerContainers, setDockerContainers] = useState<DockerContainer[]>([
    { id: 'c-8f2e9a', name: 'nginx-web', image: 'nginx:alpine', status: 'running', ports: '80:80', uptime: '1h 12m' },
    { id: 'c-3b1d5c', name: 'postgres-db', image: 'postgres:16-alpine', status: 'running', ports: '5432:5432', uptime: '45m' }
  ]);
  const [dockerLogs, setDockerLogs] = useState<string[]>(['[docker] daemon initialized']);

  // Network Scanner
  const [netIpRange, setNetIpRange] = useState('192.168.1.1/24');
  const [netIsScanning, setNetIsScanning] = useState(false);
  const [netScanProgress, setNetScanProgress] = useState(0);
  const [netDiscoveredNodes, setNetDiscoveredNodes] = useState<NetworkNode[]>([]);

  // Nmap Simulator
  const [nmapTarget, setNmapTarget] = useState('scanme.nmap.org');
  const [nmapScanType, setNmapScanType] = useState<'sS' | 'sT' | 'sV' | 'O' | 'sC'>('sS');
  const [nmapIsScanning, setNmapIsScanning] = useState(false);
  const [nmapProgress, setNmapProgress] = useState(0);
  const [nmapLogs, setNmapLogs] = useState<string[]>([]);
  const [nmapResults, setNmapResults] = useState<{
    host: string;
    ip: string;
    status: string;
    latency: string;
    os?: string;
    ports: { port: string; state: string; service: string; version: string; vuln?: string }[];
  } | null>(null);

  // Masscan Simulator
  const [masscanTarget, setMasscanTarget] = useState('192.168.1.0/24');
  const [masscanRate, setMasscanRate] = useState('10000');
  const [masscanPorts, setMasscanPorts] = useState('80,443,22,8080');
  const [masscanIsScanning, setMasscanIsScanning] = useState(false);
  const [masscanProgress, setMasscanProgress] = useState(0);
  const [masscanLogs, setMasscanLogs] = useState<string[]>([]);
  const [masscanResults, setMasscanResults] = useState<{
    ip: string;
    port: string;
    status: string;
    timestamp: string;
  }[]>([]);

  // Kali Metasploit State
  const [msfTarget, setMsfTarget] = useState('192.168.1.12');
  const [msfExploit, setMsfExploit] = useState('exploit/windows/smb/ms17_010_eternalblue');
  const [msfPayload, setMsfPayload] = useState('windows/x64/meterpreter/reverse_tcp');
  const [msfIsRunning, setMsfIsRunning] = useState(false);
  const [msfLogs, setMsfLogs] = useState<string[]>([]);
  const [msfSessionActive, setMsfSessionActive] = useState(false);
  const [msfCmdInput, setMsfCmdInput] = useState('');
  const [msfCmdOutput, setMsfCmdOutput] = useState<string[]>(['meterpreter > type sysinfo for info, shell for system root prompt']);

  // Kali Hydra State
  const [hydraTarget, setHydraTarget] = useState('192.168.1.1');
  const [hydraService, setHydraService] = useState<'ssh' | 'ftp' | 'http'>('ssh');
  const [hydraUser, setHydraUser] = useState('admin');
  const [hydraWordlist, setHydraWordlist] = useState<'rockyou' | 'common' | 'simple'>('rockyou');
  const [hydraIsRunning, setHydraIsRunning] = useState(false);
  const [hydraProgress, setHydraProgress] = useState(0);
  const [hydraLogs, setHydraLogs] = useState<string[]>([]);
  const [hydraCracked, setHydraCracked] = useState<string | null>(null);

  // Kali John State
  const [johnHash, setJohnHash] = useState('$6$saltsalt$fWbY7N3aU8d2s9P0m1K2...');
  const [johnIsRunning, setJohnIsRunning] = useState(false);
  const [johnProgress, setJohnProgress] = useState(0);
  const [johnLogs, setJohnLogs] = useState<string[]>([]);
  const [johnCracked, setJohnCracked] = useState<string | null>(null);

  // Kali Wireshark State
  const [wireIsCapturing, setWireIsCapturing] = useState(false);
  const [wireInterface, setWireInterface] = useState<'eth0' | 'wlan0' | 'lo'>('eth0');
  const [wireFilter, setWireFilter] = useState('');
  const [wirePackets, setWirePackets] = useState<{
    id: number;
    time: string;
    source: string;
    destination: string;
    protocol: 'TCP' | 'HTTP' | 'UDP' | 'DNS' | 'ICMP' | 'TLS';
    length: number;
    info: string;
    hex: string;
  }[]>([]);
  const [wireSelectedPacket, setWireSelectedPacket] = useState<any>(null);

  // Kali NetHunter Simulator State
  const [nhActiveTab, setNhActiveTab] = useState<'dashboard' | 'badusb' | 'wireless' | 'bluetooth' | 'commands'>('dashboard');
  const [nhBadUsbPayload, setNhBadUsbPayload] = useState('reverse_shell');
  const [nhBadUsbStatus, setNhBadUsbStatus] = useState<'idle' | 'injecting' | 'completed'>('idle');
  const [nhBadUsbProgress, setNhBadUsbProgress] = useState(0);
  const [nhBadUsbLogs, setNhBadUsbLogs] = useState<string[]>([]);
  
  // Wireless Sniffer
  const [nhWifiScanning, setNhWifiScanning] = useState(false);
  const [nhWifiProgress, setNhWifiProgress] = useState(0);
  const [nhWifiTarget, setNhWifiTarget] = useState<string | null>(null);
  const [nhWifiAttackActive, setNhWifiAttackActive] = useState(false);
  const [nhWifiAttackType, setNhWifiAttackType] = useState('deauth');
  const [nhWifiAttackProgress, setNhWifiAttackProgress] = useState(0);
  const [nhWifiLogs, setNhWifiLogs] = useState<string[]>([]);
  const [nhWifiResults, setNhWifiResults] = useState<{
    ssid: string;
    bssid: string;
    signal: string;
    channel: string;
    encryption: string;
    clients: number;
  }[]>([]);

  // Bluetooth Scanner
  const [nhBtScanning, setNhBtScanning] = useState(false);
  const [nhBtProgress, setNhBtProgress] = useState(0);
  const [nhBtLogs, setNhBtLogs] = useState<string[]>([]);
  const [nhBtResults, setNhBtResults] = useState<{
    name: string;
    mac: string;
    rssi: string;
    type: string;
    services: string;
  }[]>([]);

  // The Onion Router (Tor) Simulator State
  const [torUrl, setTorUrl] = useState('https://torproject.onion');
  const [torIsConnecting, setTorIsConnecting] = useState(false);
  const [torConnectionProgress, setTorConnectionProgress] = useState(100);
  const [torCircuit, setTorCircuit] = useState([
    { name: 'onionGuard-DE', ip: '94.130.12.8', country: 'Germany 🇩🇪', role: 'Guard Relay' },
    { name: 'middleRelay-SE', ip: '185.112.144.12', country: 'Sweden 🇸🇪', role: 'Middle Relay' },
    { name: 'onionExit-IS', ip: '82.221.129.10', country: 'Iceland 🇮🇸', role: 'Exit Relay' }
  ]);
  const [torLogs, setTorLogs] = useState<string[]>([
    'Oct 24 10:11:02.000 [notice] Tor v0.4.8.10 running on Linux with Libevent 2.1.12-stable, OpenSSL 3.0.13, Zlib 1.3, Liblzma 5.4.5, and Libzstd 1.5.5.',
    'Oct 24 10:11:02.000 [notice] Tor can\'t help you if you use insecure configurations. Read guides first.',
    'Oct 24 10:11:02.100 [notice] Read config: /etc/tor/torrc',
    'Oct 24 10:11:02.200 [notice] Opening Socks listener on 127.0.0.1:9050',
    'Oct 24 10:11:02.300 [notice] Opened Socks listener on 127.0.0.1:9050',
    'Oct 24 10:11:03.000 [notice] Bootstrapped 5% (conn): Connecting to directory server',
    'Oct 24 10:11:03.500 [notice] Bootstrapped 80% (ap_conn): Connecting to entry guard',
    'Oct 24 10:11:04.200 [notice] Bootstrapped 100% (done): Done routing encryption keys with guard/middle/exit'
  ]);
  const [torChatPosts, setTorChatPosts] = useState([
    { id: 'p1', name: 'AnonymousOnion', content: 'Scan of public darknet entrypoints completed. 15 new hidden services detected this hour on the dark web.', timestamp: '2 minutes ago', layer: 'dark' },
    { id: 'p2', name: 'DatabaseAegis', content: 'Security warning: Deep web academic databases containing healthcare credentials should utilize strict mutual TLS.', timestamp: '15 minutes ago', layer: 'deep' },
    { id: 'p3', name: 'SurfSecure', content: 'Just indexing standard surface web search engine crawlers. Remember that public sites make up only 4% of the entire internet!', timestamp: '45 minutes ago', layer: 'surface' },
    { id: 'p4', name: 'ZeroDayGamer', content: 'Has anyone audited the latest Linux kernel 6.8 socket vulnerabilities yet?', timestamp: '1 hour ago', layer: 'dark' },
    { id: 'p5', name: 'CryptoPanda', content: 'Decentralization is the only way to safeguard online privacy. Remember to use different circuit pathways.', timestamp: '2 hours ago', layer: 'deep' }
  ]);
  const [torNewPostUser, setTorNewPostUser] = useState('GhostUser');
  const [torNewPostContent, setTorNewPostContent] = useState('');
  const [torNewPostLayer, setTorNewPostLayer] = useState<'surface' | 'deep' | 'dark'>('dark');
  const [torChatLayerFilter, setTorChatLayerFilter] = useState<'all' | 'surface' | 'deep' | 'dark'>('all');
  const [activeIcebergLayer, setActiveIcebergLayer] = useState<'surface' | 'deep' | 'dark'>('dark');
  const [torSecurityLevel, setTorSecurityLevel] = useState<'standard' | 'safer' | 'safest'>('standard');
  const [torDdgQuery, setTorDdgQuery] = useState('');
  const [torActiveLeak, setTorActiveLeak] = useState<any>(null);
  const [showTorSecurityPopup, setShowTorSecurityPopup] = useState(false);

  // VPN (Virtual Private Network) Simulator State
  const [vpnConnected, setVpnConnected] = useState(false);
  const [vpnLocation, setVpnLocation] = useState<string>('iceland');
  const [vpnProtocol, setVpnProtocol] = useState<'wireguard' | 'openvpn' | 'ipsec'>('wireguard');
  const [vpnKillSwitch, setVpnKillSwitch] = useState(true);
  const [vpnDownloadSpeed, setVpnDownloadSpeed] = useState(0);
  const [vpnUploadSpeed, setVpnUploadSpeed] = useState(0);
  const [vpnPing, setVpnPing] = useState(12);
  const [vpnIsConnecting, setVpnIsConnecting] = useState(false);
  const [vpnBytesTransmitted, setVpnBytesTransmitted] = useState(1285000);
  const [vpnBytesReceived, setVpnBytesReceived] = useState(4820000);
  const [vpnHistory, setVpnHistory] = useState<number[]>([10, 15, 8, 24, 18, 30, 22, 14, 25, 40]);

  // VPN Search & Region filters
  const [vpnSearchQuery, setVpnSearchQuery] = useState('');
  const [vpnRegionFilter, setVpnRegionFilter] = useState<'All' | 'Europe' | 'Americas' | 'Asia' | 'Africa' | 'Oceania'>('All');

  // Microsecond IP rotation state
  const [vpnActiveIp, setVpnActiveIp] = useState('82.221.129.11');
  const [vpnIsRotating, setVpnIsRotating] = useState(false);
  const [vpnLastRotationUs, setVpnLastRotationUs] = useState<number>(180);
  const [vpnRotationHistory, setVpnRotationHistory] = useState<{ id: string; oldIp: string; newIp: string; durationUs: number; timestamp: string }[]>([
    { id: '1', oldIp: '185.112.144.18', newIp: '82.221.129.11', durationUs: 450, timestamp: '11:07:23.120' },
    { id: '2', oldIp: '196.223.45.62', newIp: '185.112.144.18', durationUs: 120, timestamp: '11:06:45.342' },
    { id: '3', oldIp: '192.42.116.19', newIp: '196.223.45.62', durationUs: 310, timestamp: '11:06:12.802' }
  ]);
  const [vpnLogs, setVpnLogs] = useState<string[]>([
    '[0.000 ms] WireGuard kernel module loaded.',
    '[0.120 ms] Curve25519 secure key exchange initiated.',
    '[0.180 ms] [wg0] Interface bound. Public virtual IP: 82.221.129.11',
    '[0.210 ms] Dynamic MTU configured to 1420 bytes.'
  ]);
  const [vpnAutoRotate, setVpnAutoRotate] = useState(false);
  const [vpnRotationIntervalMs, setVpnRotationIntervalMs] = useState<number>(1000);

  // Axis Directory & Routing Map State
  const [axisNodes, setAxisNodes] = useState([
    { id: 'node-de', name: 'onionGuard-DE', ip: '94.130.12.8', country: 'Germany 🇩🇪', role: 'Guard Relay', x: 80, y: 75, bandwidth: 120, latency: 45, entropy: 256 },
    { id: 'node-se', name: 'middleRelay-SE', ip: '185.112.144.12', country: 'Sweden 🇸🇪', role: 'Middle Relay', x: 55, y: 60, bandwidth: 85, latency: 62, entropy: 256 },
    { id: 'node-is', name: 'onionExit-IS', ip: '82.221.129.10', country: 'Iceland 🇮🇸', role: 'Exit Relay', x: 30, y: 85, bandwidth: 60, latency: 110, entropy: 512 },
    { id: 'node-nl', name: 'onionGuard-NL', ip: '82.197.204.30', country: 'Netherlands 🇳🇱', role: 'Guard Relay', x: 85, y: 45, bandwidth: 140, latency: 38, entropy: 256 },
    { id: 'node-ch', name: 'onionGuard-CH', ip: '109.202.107.12', country: 'Switzerland 🇨🇭', role: 'Guard Relay', x: 75, y: 65, bandwidth: 115, latency: 50, entropy: 256 },
    { id: 'node-fi', name: 'onionGuard-FI', ip: '95.175.99.2', country: 'Finland 🇫🇮', role: 'Guard Relay', x: 90, y: 80, bandwidth: 150, latency: 42, entropy: 512 },
    { id: 'node-fr', name: 'middleRelay-FR', ip: '51.15.143.190', country: 'France 🇫🇷', role: 'Middle Relay', x: 60, y: 40, bandwidth: 95, latency: 55, entropy: 256 },
    { id: 'node-ca', name: 'middleRelay-CA', ip: '198.50.155.8', country: 'Canada 🇨🇦', role: 'Middle Relay', x: 45, y: 50, bandwidth: 78, latency: 85, entropy: 256 },
    { id: 'node-jp', name: 'middleRelay-JP', ip: '210.140.10.85', country: 'Japan 🇯🇵', role: 'Middle Relay', x: 50, y: 70, bandwidth: 110, latency: 125, entropy: 256 },
    { id: 'node-ro', name: 'onionExit-RO', ip: '46.97.168.102', country: 'Romania 🇷🇴', role: 'Exit Relay', x: 25, y: 55, bandwidth: 65, latency: 70, entropy: 256 },
    { id: 'node-us', name: 'onionExit-US', ip: '192.42.116.16', country: 'United States 🇺🇸', role: 'Exit Relay', x: 40, y: 30, bandwidth: 130, latency: 95, entropy: 512 },
    { id: 'node-no', name: 'onionExit-NO', ip: '185.243.218.2', country: 'Norway 🇳🇴', role: 'Exit Relay', x: 35, y: 75, bandwidth: 90, latency: 58, entropy: 256 }
  ]);
  const [selectedAxisNode, setSelectedAxisNode] = useState<any>(null);
  const [axisSearch, setAxisSearch] = useState('');
  const [axisDiagnosticActive, setAxisDiagnosticActive] = useState(false);
  const [axisDiagnosticProgress, setAxisDiagnosticProgress] = useState(0);
  const [axisDiagnosticLogs, setAxisDiagnosticLogs] = useState<string[]>([]);

  const requestNewCircuit = () => {
    setTorIsConnecting(true);
    setTorConnectionProgress(10);
    
    const newTimestamp = new Date().toLocaleTimeString();
    setTorLogs(prev => [
      ...prev,
      `[${newTimestamp}] [notice] Received signal SIGNEWNYM (requesting new onion routing relays)`,
      `[${newTimestamp}] [notice] Closing existing circuit flow channels.`,
      `[${newTimestamp}] [notice] Negotiating new 3-layer TLS session keys with Tor authority servers.`
    ]);

    const guards = [
      { name: 'onionGuard-NL', ip: '82.197.204.30', country: 'Netherlands 🇳🇱', role: 'Guard Relay' },
      { name: 'onionGuard-CH', ip: '109.202.107.12', country: 'Switzerland 🇨🇭', role: 'Guard Relay' },
      { name: 'onionGuard-FI', ip: '95.175.99.2', country: 'Finland 🇫🇮', role: 'Guard Relay' }
    ];
    const middles = [
      { name: 'middleRelay-FR', ip: '51.15.143.190', country: 'France 🇫🇷', role: 'Middle Relay' },
      { name: 'middleRelay-CA', ip: '198.50.155.8', country: 'Canada 🇨🇦', role: 'Middle Relay' },
      { name: 'middleRelay-JP', ip: '210.140.10.85', country: 'Japan 🇯🇵', role: 'Middle Relay' }
    ];
    const exits = [
      { name: 'onionExit-RO', ip: '46.97.168.102', country: 'Romania 🇷🇴', role: 'Exit Relay' },
      { name: 'onionExit-US', ip: '192.42.116.16', country: 'United States 🇺🇸', role: 'Exit Relay' },
      { name: 'onionExit-NO', ip: '185.243.218.2', country: 'Norway 🇳🇴', role: 'Exit Relay' }
    ];

    const randomGuard = guards[Math.floor(Math.random() * guards.length)];
    const randomMiddle = middles[Math.floor(Math.random() * middles.length)];
    const randomExit = exits[Math.floor(Math.random() * exits.length)];

    setTimeout(() => {
      setTorConnectionProgress(45);
      setTorLogs(prev => [
        ...prev,
        `[${newTimestamp}] [notice] Established 1st hop: connected to guard ${randomGuard.name} (${randomGuard.ip})`
      ]);
      
      setTimeout(() => {
        setTorConnectionProgress(75);
        setTorLogs(prev => [
          ...prev,
          `[${newTimestamp}] [notice] Established 2nd hop: routed to middle ${randomMiddle.name} (${randomMiddle.ip})`
        ]);

        setTimeout(() => {
          setTorCircuit([randomGuard, randomMiddle, randomExit]);
          setTorIsConnecting(false);
          setTorConnectionProgress(100);
          setTorLogs(prev => [
            ...prev,
            `[${newTimestamp}] [notice] Established 3rd hop: connection completed to exit ${randomExit.name} (${randomExit.ip})`,
            `[${newTimestamp}] [notice] Tor circuit rebuilt successfully. All traffic is now safely tunneled.`
          ]);
        }, 300);
      }, 300);
    }, 400);
  };

  // Matrix canvas
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(prev => {
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.max(5, Math.min(95, prev + delta));
      });
      setRamUsage(prev => {
        const delta = (Math.random() * 0.08) - 0.04;
        return Number(Math.max(1.2, Math.min(7.8, prev + delta)).toFixed(2));
      });
      const now = new Date();
      setUptime(`${String(now.getHours() % 12).padStart(2, '0')}h ${String(now.getMinutes()).padStart(2, '0')}m ${String(now.getSeconds()).padStart(2, '0')}s`);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Kali Wireshark Packet Simulator
  useEffect(() => {
    if (!wireIsCapturing) return;

    const sources = ['192.168.1.42', '192.168.1.102', '10.0.0.15', '45.33.32.156', '8.8.8.8', '192.168.1.1'];
    const dests = ['192.168.1.1', '8.8.8.8', '10.0.0.1', '192.168.1.12', '192.168.1.42', '104.244.42.1'];
    const protocols: ('TCP' | 'HTTP' | 'UDP' | 'DNS' | 'ICMP' | 'TLS')[] = ['TCP', 'HTTP', 'UDP', 'DNS', 'ICMP', 'TLS'];
    const infos = {
      TCP: [
        '50231 → 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM=1',
        '443 → 50231 [SYN, ACK] Seq=0 Ack=1 Win=28960 Len=0 MSS=1460',
        '50231 → 443 [ACK] Seq=1 Ack=1 Win=64240 Len=0',
        '3000 → 49212 [PSH, ACK] Seq=45 Ack=210 Win=64128 Len=142'
      ],
      HTTP: [
        'GET /api/system/status HTTP/1.1',
        'HTTP/1.1 200 OK (application/json)',
        'POST /api/auth/v2/login HTTP/1.1',
        'HTTP/1.1 401 Unauthorized (text/html)'
      ],
      UDP: [
        'Source port: 51230  Destination port: 53',
        'Source port: 53  Destination port: 51230',
        'Source port: 49200  Destination port: 1900'
      ],
      DNS: [
        'Standard query 0xa3b2 A scanme.nmap.org',
        'Standard query response 0xa3b2 A 45.33.32.156',
        'Standard query 0x77c2 PTR 1.1.168.192.in-addr.arpa'
      ],
      ICMP: [
        'Echo (ping) request id=0x04e1, seq=1/256, ttl=64',
        'Echo (ping) reply id=0x04e1, seq=1/256, ttl=58',
        'Destination unreachable (Port unreachable)'
      ],
      TLS: [
        'Client Hello (TLSv1.3)',
        'Server Hello, Change Cipher Spec, Encrypted Extensions',
        'Application Data (TLSv1.3 encrypted payload)'
      ]
    };

    const interval = setInterval(() => {
      const proto = protocols[Math.floor(Math.random() * protocols.length)];
      const src = sources[Math.floor(Math.random() * sources.length)];
      const dst = dests[Math.floor(Math.random() * dests.length)];
      const protoInfos = infos[proto];
      const info = protoInfos[Math.floor(Math.random() * protoInfos.length)];
      const len = proto === 'TCP' ? 66 : proto === 'HTTP' ? 342 : proto === 'UDP' ? 84 : proto === 'DNS' ? 120 : proto === 'ICMP' ? 98 : 512;

      // Generate random looking hex dumps
      const generateHexDump = () => {
        let hex = '';
        for (let i = 0; i < Math.min(len, 64); i += 16) {
          const addr = i.toString(16).padStart(4, '0');
          let bytes = '';
          let ascii = '';
          for (let j = 0; j < 16; j++) {
            if (i + j < len) {
              const b = Math.floor(Math.random() * 256);
              bytes += b.toString(16).padStart(2, '0') + ' ';
              ascii += (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.';
            } else {
              bytes += '   ';
            }
          }
          hex += `${addr}  ${bytes} ${ascii}\n`;
        }
        return hex;
      };

      setWirePackets(prev => {
        const newId = prev.length + 1;
        const nowSec = (newId * 1.15).toFixed(4);
        const newPacket = {
          id: newId,
          time: nowSec,
          source: src,
          destination: dst,
          protocol: proto,
          length: len,
          info: info,
          hex: generateHexDump()
        };
        return [...prev, newPacket];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [wireIsCapturing]);

  // VPN performance stats generator
  useEffect(() => {
    if (!vpnConnected || vpnIsConnecting) {
      setVpnDownloadSpeed(0);
      setVpnUploadSpeed(0);
      return;
    }

    const timer = setInterval(() => {
      // Simulate download speed (MB/s) and upload speed (MB/s)
      const isWireGuard = vpnProtocol === 'wireguard';
      const baseDownload = isWireGuard ? 140 : 85;
      const baseUpload = isWireGuard ? 40 : 25;
      const download = Math.floor(Math.random() * 40) + baseDownload;
      const upload = Math.floor(Math.random() * 15) + baseUpload;
      const ping = Math.floor(Math.random() * 8) + (vpnLocation === 'iceland' ? 8 : vpnLocation === 'switzerland' ? 14 : vpnLocation === 'seychelles' ? 65 : 22);

      setVpnDownloadSpeed(download);
      setVpnUploadSpeed(upload);
      setVpnPing(ping);

      // Add to bandwidth history (keep last 12 points)
      setVpnHistory(prev => {
        const next = [...prev.slice(1), download];
        return next;
      });

      // Increment bytes
      setVpnBytesTransmitted(prev => prev + Math.floor(Math.random() * 820000) + 150000);
      setVpnBytesReceived(prev => prev + Math.floor(Math.random() * 4100000) + 900000);
    }, 1200);

    return () => clearInterval(timer);
  }, [vpnConnected, vpnProtocol, vpnLocation, vpnIsConnecting]);

  const rotateVpnIp = (targetLoc?: string) => {
    setVpnIsRotating(true);
    const loc = targetLoc || vpnLocation;
    const oldIp = vpnActiveIp;
    
    const matched = vpnServers.find(s => s.id === loc);
    let newIp = '';
    if (matched) {
      const parts = matched.ip.split('.');
      const third = Math.floor(Math.random() * 254) + 1;
      const fourth = Math.floor(Math.random() * 254) + 1;
      newIp = `${parts[0]}.${parts[1]}.${third}.${fourth}`;
    } else {
      newIp = Array.from({ length: 4 }, () => Math.floor(Math.random() * 254) + 1).join('.');
    }
    
    const durationUs = Math.floor(Math.random() * 920) + 40;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    
    setTimeout(() => {
      setVpnActiveIp(newIp);
      setVpnLastRotationUs(durationUs);
      setVpnRotationHistory(prev => [
        { id: `rot-${Date.now()}-${Math.random()}`, oldIp, newIp, durationUs, timestamp: timeStr },
        ...prev.slice(0, 19)
      ]);
      
      setVpnLogs([
        `[+0.000 µs] Instating sub-microsecond IP Rotation Directive...`,
        `[+0.035 µs] Terminating tunnel endpoint descriptor for old node: ${oldIp}...`,
        `[+0.090 µs] Formulating ephemeral curve25519 handshake token...`,
        `[+${(durationUs * 0.75).toFixed(1)} µs] Handshake validated on port 51820: ${newIp}`,
        `[+${durationUs} µs] NovaOS virtual network interface re-established.`
      ]);
      setVpnIsRotating(false);
    }, 120);
  };

  useEffect(() => {
    if (!vpnAutoRotate || !vpnConnected) return;
    const timer = setInterval(() => {
      rotateVpnIp();
    }, vpnRotationIntervalMs);
    return () => clearInterval(timer);
  }, [vpnAutoRotate, vpnConnected, vpnLocation, vpnActiveIp, vpnRotationIntervalMs]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    setTerminalLines(prev => [...prev, { type: 'input', text: `root@novaOS:~# ${cmd}` }]);
    setInputVal('');

    const updatedHist = [...commandHistory, cmd];
    setCommandHistory(updatedHist);
    setHistoryIndex(-1);

    const parts = cmd.split(' ');
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (baseCmd) {
      case 'clear':
        setTerminalLines([]);
        break;
      case 'help':
        setTerminalLines(prev => [
          ...prev,
          { type: 'system', text: '--- NovaOS Simulator Core Commands ---' },
          { type: 'output', text: 'help                      - Display active help list' },
          { type: 'output', text: 'clear                     - Wipe shell buffer' },
          { type: 'output', text: 'neofetch                  - System architectural layout parameters' },
          { type: 'output', text: 'uname -a                  - Output simulation kernel model' },
          { type: 'output', text: 'whoami                    - "root"' },
          { type: 'output', text: 'ls                        - List active virtual storage folder files' },
          { type: 'output', text: 'cat <filename>            - Read file contents' },
          { type: 'output', text: 'echo <txt> > <filename>   - Write files to virtual FS' },
          { type: 'output', text: 'rm <filename>             - Delete from virtual storage file' },
          { type: 'output', text: 'apt list --installed      - View package registry configurations' },
          { type: 'output', text: 'apt install <package>     - Setup packages locally via CLI' },
          { type: 'output', text: 'ask-ai <any question>     - Direct call to server Gemini API link!' },
          { type: 'success', text: 'GUI UTILITY CODES (Type directly or use store):' },
          { type: 'output', text: 'htop | nano | python3 | matrix | snake | docker | network | nmap | masscan | desktop | ios26' },
          { type: 'success', text: 'KALI PEN-TESTING UTILITIES (Requires install via apt install <pkg>):' },
          { type: 'output', text: 'msfconsole | hydra | john | wireshark | nethunter | tor | vpn' },
          { type: 'success', text: 'SPECIALS:' },
          { type: 'output', text: 'kali-undercover           - Switch system theme to Kali Pentest Matrix' }
        ]);
        break;
      case 'neofetch':
        setTerminalLines(prev => [
          ...prev,
          { type: 'success', text: '       _..-._      root@nova-hypervisor' },
          { type: 'success', text: '     /   _   \\    ---------------------' },
          { type: 'success', text: '    |   (o)   |   OS: NovaOS Linux 24.04-LTS' },
          { type: 'success', text: '     \\   ^   /    Host: Nova AI Developer Workspace' },
          { type: 'success', text: '      `-----\'     Kernel: 6.8.0-45-generic' },
          { type: 'success', text: '                  DE: Tailwind Glassmorphic Window Manager' },
          { type: 'success', text: '                  Memory: ' + Math.round(ramUsage * 1024) + 'MB / 8192MB' }
        ]);
        break;
      case 'uname':
        setTerminalLines(prev => [...prev, { type: 'output', text: 'Linux nova-hypervisor 6.8.0-45-generic #45 x86_64 GNU/Linux' }]);
        break;
      case 'whoami':
        setTerminalLines(prev => [...prev, { type: 'output', text: 'root' }]);
        break;
      case 'ls':
        setTerminalLines(prev => [
          ...prev,
          ...Object.keys(fileSystem).map(name => ({ type: 'output' as any, text: `-rw-r--r-- 1 root root ${fileSystem[name].length} Jul 20 ${name}` }))
        ]);
        break;
      case 'cat':
        if (!args[0]) {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'usage: cat <filename>' }]);
        } else if (fileSystem[args[0]] !== undefined) {
          setTerminalLines(prev => [
            ...prev,
            ...fileSystem[args[0]].split('\n').map(line => ({ type: 'output' as any, text: line }))
          ]);
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: `cat: ${args[0]}: No such file or directory` }]);
        }
        break;
      case 'echo':
        const rawLine = args.join(' ');
        const redirectIdx = rawLine.indexOf('>');
        if (redirectIdx !== -1) {
          const textVal = rawLine.slice(0, redirectIdx).trim().replace(/^['"]|['"]$/g, '');
          const filename = rawLine.slice(redirectIdx + 1).trim();
          if (filename) {
            setFileSystem(prev => ({ ...prev, [filename]: textVal }));
            setTerminalLines(prev => [...prev, { type: 'success', text: `Written contents to file "${filename}"` }]);
          }
        } else {
          setTerminalLines(prev => [...prev, { type: 'output', text: rawLine }]);
        }
        break;
      case 'rm':
        if (!args[0]) {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'usage: rm <filename>' }]);
        } else if (fileSystem[args[0]] !== undefined) {
          const nextFs = { ...fileSystem };
          delete nextFs[args[0]];
          setFileSystem(nextFs);
          setTerminalLines(prev => [...prev, { type: 'success', text: `Removed file: ${args[0]}` }]);
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: `rm: ${args[0]}: No such file` }]);
        }
        break;
      case 'apt':
        if (args[0] === 'list' && args[1] === '--installed') {
          setTerminalLines(prev => [
            ...prev,
            { type: 'system', text: 'Listing installed modules...' },
            ...packages.filter(p => p.isInstalled).map(p => ({ type: 'success' as any, text: `${p.name} ${p.version} [installed, local]` }))
          ]);
        } else if (args[0] === 'install') {
          const pName = args[1];
          const found = packages.find(p => p.name === pName || p.id === pName);
          if (!found) {
            setTerminalLines(prev => [...prev, { type: 'error', text: `E: Unable to locate package ${pName}` }]);
          } else if (found.isInstalled) {
            setTerminalLines(prev => [...prev, { type: 'system', text: `${pName} is already installed` }]);
          } else {
            triggerPackageInstall(found.id);
          }
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'usage: apt [list --installed | install <package>]' }]);
        }
        break;
      case 'ask-ai':
        const prompt = args.join(' ');
        if (!prompt) {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'usage: ask-ai <instructions for Gemini>' }]);
        } else {
          await triggerGeminiAskAI(prompt);
        }
        break;

      // Apps
      case 'htop': setActiveWindowApp('htop'); break;
      case 'nano':
        const fileTarget = args[0] || 'welcome.txt';
        setNanoFilename(fileTarget);
        setNanoContent(fileSystem[fileTarget] || '');
        setActiveWindowApp('nano');
        break;
      case 'python3':
        const py = packages.find(p => p.id === 'python');
        if (py?.isInstalled) setActiveWindowApp('python');
        else setTerminalLines(prev => [...prev, { type: 'error', text: 'python3 is not installed. Run "apt install python3-ide"' }]);
        break;
      case 'matrix':
        const mat = packages.find(p => p.id === 'matrix');
        if (mat?.isInstalled) setActiveWindowApp('matrix');
        else setTerminalLines(prev => [...prev, { type: 'error', text: 'matrix-saver is not installed. Run "apt install matrix-saver"' }]);
        break;
      case 'snake':
        const snk = packages.find(p => p.id === 'snake');
        if (snk?.isInstalled) {
          resetSnakeGame();
          setActiveWindowApp('snake');
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'snake-game is not installed. Run "apt install snake-game"' }]);
        }
        break;
      case 'docker':
        const dck = packages.find(p => p.id === 'docker');
        if (dck?.isInstalled) setActiveWindowApp('docker');
        else setTerminalLines(prev => [...prev, { type: 'error', text: 'docker-sim is not installed. Run "apt install docker-sim"' }]);
        break;
      case 'network':
        const net = packages.find(p => p.id === 'network');
        if (net?.isInstalled) setActiveWindowApp('network');
        else setTerminalLines(prev => [...prev, { type: 'error', text: 'network-scanner is not installed. Run "apt install network-scanner"' }]);
        break;
      case 'nmap':
        const nmp = packages.find(p => p.id === 'nmap');
        if (nmp?.isInstalled) {
          if (args.length === 0) {
            setActiveWindowApp('nmap');
          } else {
            await runNmapCLI(args);
          }
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'nmap is not installed. Run "apt install nmap"' }]);
        }
        break;
      case 'masscan':
        const msc = packages.find(p => p.id === 'masscan');
        if (msc?.isInstalled) {
          if (args.length === 0) {
            setActiveWindowApp('masscan');
          } else {
            await runMasscanCLI(args);
          }
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'masscan is not installed. Run "apt install masscan"' }]);
        }
        break;
      case 'kali-undercover':
        setTerminalTheme('kali');
        setTerminalLines(prev => [
          ...prev,
          { type: 'system', text: '====================================================' },
          { type: 'success', text: ' KALI UNDERCOVER MODE ACTIVE ' },
          { type: 'success', text: ' Theme switched to dark cybersecurity slate.' },
          { type: 'success', text: ' Pre-loaded hacking binaries & dragon motifs ready.' },
          { type: 'system', text: '====================================================' }
        ]);
        break;
      case 'msfconsole':
        const msf = packages.find(p => p.id === 'metasploit');
        if (msf?.isInstalled) {
          setActiveWindowApp('metasploit');
          setTerminalLines(prev => [...prev, { type: 'system', text: 'Launching Metasploit Framework Console...' }]);
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'msfconsole is not installed. Run "apt install metasploit-framework"' }]);
        }
        break;
      case 'hydra':
        const hyd = packages.find(p => p.id === 'hydra');
        if (hyd?.isInstalled) {
          if (args.length === 0) {
            setActiveWindowApp('hydra');
          } else {
            setIsShellWaiting(true);
            setTerminalLines(prev => [
              ...prev,
              { type: 'system', text: 'Hydra v9.5 (c) 2026 THC - multi-threaded parallel logon cracker' },
              { type: 'output', text: `Hydra starting on target ${args.includes('-t') ? args[args.indexOf('-t') + 1] : '192.168.1.1'}` },
              { type: 'output', text: '[SSH] Attacking SSH port 22' },
              { type: 'output', text: '[SSH] Loading standard admin usernames and rockyou.txt passwords...' }
            ]);
            await new Promise(r => setTimeout(r, 1200));
            setTerminalLines(prev => [
              ...prev,
              { type: 'output', text: 'Trying admin / password123...' },
              { type: 'output', text: 'Trying admin / login...' },
              { type: 'output', text: 'Trying admin / admin...' }
            ]);
            await new Promise(r => setTimeout(r, 1000));
            setTerminalLines(prev => [
              ...prev,
              { type: 'success', text: '[22][ssh] host: 192.168.1.1   login: admin   password: admin' },
              { type: 'system', text: '1 target successfully cracked!' }
            ]);
            setIsShellWaiting(false);
          }
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'hydra is not installed. Run "apt install hydra-crack"' }]);
        }
        break;
      case 'john':
        const jhn = packages.find(p => p.id === 'john');
        if (jhn?.isInstalled) {
          if (args.length === 0) {
            setActiveWindowApp('john');
          } else {
            setIsShellWaiting(true);
            setTerminalLines(prev => [
              ...prev,
              { type: 'system', text: 'John the Ripper 1.9.0-jumbo-1' },
              { type: 'output', text: 'Using default UTF-8 unicode hashes encoding' },
              { type: 'output', text: 'Loaded 1 password hash (bcrypt / sha512)' }
            ]);
            await new Promise(r => setTimeout(r, 1500));
            setTerminalLines(prev => [
              ...prev,
              { type: 'output', text: 'Running dictionary search on rockyou.txt...' },
              { type: 'success', text: 'dragon123        (administrator)' },
              { type: 'system', text: '1 password hash cracked successfully.' }
            ]);
            setIsShellWaiting(false);
          }
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'john is not installed. Run "apt install john-the-ripper"' }]);
        }
        break;
      case 'wireshark':
        const wrs = packages.find(p => p.id === 'wireshark');
        if (wrs?.isInstalled) {
          setActiveWindowApp('wireshark');
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'wireshark is not installed. Run "apt install wireshark-gui"' }]);
        }
        break;
      case 'nethunter':
        const nh = packages.find(p => p.id === 'nethunter');
        if (nh?.isInstalled) {
          await runNethunterCLI(args);
        } else {
          setTerminalLines(prev => [...prev, { type: 'error', text: 'nethunter is not installed. Run "apt install kali-nethunter"' }]);
        }
        break;
      case 'tor':
      case 'tor-browser':
        const torpkg = packages.find(p => p.id === 'tor');
        if (torpkg?.isInstalled) {
          setActiveWindowApp('tor');
          setTerminalLines(prev => [...prev, { type: 'system', text: 'Opening The Onion Router (Tor) Secure Browser...' }]);
        } else {
          setTerminalLines(prev => [
            ...prev,
            { type: 'error', text: 'tor is not installed. Run "apt install tor-browser" or find it in the Software Store.' }
          ]);
          setActiveTab('store');
        }
        break;
      case 'vpn':
      case 'wireguard':
      case 'wg':
        const vpnpkg = packages.find(p => p.id === 'vpn');
        if (vpnpkg?.isInstalled) {
          if (args.length === 0) {
            setActiveWindowApp('vpn');
            setTerminalLines(prev => [...prev, { type: 'system', text: 'Launching WireGuard Graphical Interface...' }]);
          } else {
            const sub = args[0].toLowerCase();
            if (sub === 'status' || sub === 'show') {
              if (vpnConnected) {
                const activeSrv = vpnServers.find(s => s.id === vpnLocation) || vpnServers[0];
                setTerminalLines(prev => [
                  ...prev,
                  { type: 'success', text: `interface: wg0 (WireGuard Protocol)` },
                  { type: 'output', text: `  public key: eCgX5pYjW...Fm3uD12T=` },
                  { type: 'output', text: `  private key: (hidden)` },
                  { type: 'output', text: `  listening port: 51820` },
                  { type: 'output', text: `  status: active (CONNECTED)` },
                  { type: 'success', text: `peer: ${activeSrv.name} (${activeSrv.ip}:51820)` },
                  { type: 'output', text: `  endpoint: ${activeSrv.ip}:51820` },
                  { type: 'output', text: `  allowed ips: 0.0.0.0/0, ::/0 (All traffic routed)` },
                  { type: 'output', text: `  latest handshake: 14 seconds ago` },
                  { type: 'output', text: `  jurisdiction: ${activeSrv.jurisdiction}` },
                  { type: 'output', text: `  transfer: ${(vpnBytesReceived / (1024 * 1024)).toFixed(2)} MB received, ${(vpnBytesTransmitted / (1024 * 1024)).toFixed(2)} MB sent` }
                ]);
              } else {
                setTerminalLines(prev => [
                  ...prev,
                  { type: 'system', text: 'interface: wg0' },
                  { type: 'output', text: '  status: inactive (DISCONNECTED)' },
                  { type: 'output', text: '  Type "vpn connect" to establish tunnel connection.' }
                ]);
              }
            } else if (sub === 'connect') {
              const locArg = args[1]?.toLowerCase();
              const validLoc = vpnServers.some(s => s.id === locArg) ? locArg : 'iceland';
              setIsShellWaiting(true);
              setTerminalLines(prev => [
                ...prev,
                { type: 'system', text: `[wg0] Initializing peer connection handshake with node "${validLoc}"...` },
                { type: 'output', text: 'Resolving offshore DNS tables...' }
              ]);
              setVpnIsConnecting(true);
              await new Promise(r => setTimeout(r, 1500));
              setVpnConnected(true);
              setVpnLocation(validLoc as any);
              const activeSrv = vpnServers.find(s => s.id === validLoc) || vpnServers[0];
              setVpnActiveIp(activeSrv.ip);
              setVpnIsConnecting(false);
              setIsShellWaiting(false);
              setTerminalLines(prev => [
                ...prev,
                { type: 'success', text: `[wg0] Handshake completed successfully with ${activeSrv.name}!` },
                { type: 'success', text: `Tunnel Established! Encrypted public IP is now ${activeSrv.ip} (${activeSrv.quality})` }
              ]);
            } else if (sub === 'disconnect') {
              setTerminalLines(prev => [...prev, { type: 'system', text: '[wg0] Terminating cryptographic tunnel connection...' }]);
              setVpnConnected(false);
              setVpnDownloadSpeed(0);
              setVpnUploadSpeed(0);
              setTerminalLines(prev => [...prev, { type: 'success', text: '[wg0] VPN Disconnected. Public IP reverted to host original.' }]);
            } else {
              setTerminalLines(prev => [
                ...prev,
                { type: 'error', text: `Unknown VPN parameter "${args[0]}". Supported: status, connect [location], disconnect` }
              ]);
            }
          }
        } else {
          setTerminalLines(prev => [
            ...prev,
            { type: 'error', text: 'wireguard-vpn is not installed. Run "apt install wireguard-vpn" or install it from the store.' }
          ]);
          setActiveTab('store');
        }
        break;
      case 'desktop':
      case 'desktop-mode':
        const dskpkg = packages.find(p => p.id === 'desktop');
        if (dskpkg?.isInstalled) {
          setActiveWindowApp('desktop');
          setTerminalLines(prev => [...prev, { type: 'system', text: 'Launching Desktop-Mode GUI Environment...' }]);
        } else {
          setTerminalLines(prev => [
            ...prev,
            { type: 'error', text: 'Desktop-Mode is not installed. Run "apt install desktop-mode" or find it in the Software Store.' }
          ]);
          setActiveTab('store');
        }
        break;
      case 'ios26':
      case 'ios26-simulator':
        const iospkg = packages.find(p => p.id === 'ios26');
        if (iospkg?.isInstalled) {
          setActiveWindowApp('ios26');
          setTerminalLines(prev => [...prev, { type: 'system', text: 'Booting iOS 26 interactive mobile OS simulator...' }]);
        } else {
          setTerminalLines(prev => [
            ...prev,
            { type: 'error', text: 'iOS 26 Simulator is not installed. Run "apt install ios26-simulator" or find it in the Software Store.' }
          ]);
          setActiveTab('store');
        }
        break;
      case 'win11':
      case 'windows11':
        const winpkg = packages.find(p => p.id === 'windows11');
        if (winpkg?.isInstalled) {
          setActiveWindowApp('windows11');
          setTerminalLines(prev => [...prev, { type: 'system', text: 'Booting Windows 11 Pro Lifetime Virtual Machine...' }]);
        } else {
          setTerminalLines(prev => [
            ...prev, 
            { type: 'error', text: 'Windows 11 Pro is not installed. You must install it first from the Software Store.' }
          ]);
          setActiveTab('store');
        }
        break;
      default:
        setTerminalLines(prev => [...prev, { type: 'error', text: `bash: ${baseCmd}: command not found. Type "help" for a map of instructions.` }]);
        break;
    }
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        }
      }
    }
  };

  const triggerGeminiAskAI = async (prompt: string) => {
    if (!user) {
      setTerminalLines(prev => [...prev, { type: 'error', text: '🔐 Please sign in inside the application platform first to run the Gemini AI terminal query tool.' }]);
      if (onOpenAuth) onOpenAuth();
      return;
    }

    setIsShellWaiting(true);
    setTerminalLines(prev => [...prev, { type: 'system', text: '🤖 Calling server-side Gemini 3.5 API tunnel...' }]);

    try {
      const response = await fetch('/api/linux/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({
          prompt,
          currentDir: '/',
          fileSystemState: fileSystem
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Server error');

      const out = data.output || '';
      setTerminalLines(prev => [
        ...prev,
        { type: 'system', text: '--- Gemini shell AI assist outcome ---' },
        ...out.split('\n').map((l: string) => ({ type: 'output' as any, text: l })),
        { type: 'system', text: '--------------------------------------' }
      ]);
    } catch (err: any) {
      setTerminalLines(prev => [...prev, { type: 'error', text: `⚠️ API Connection failure: ${err.message}` }]);
    } finally {
      setIsShellWaiting(false);
    }
  };

  const triggerPackageInstall = (id: string) => {
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;

    if (id === 'windows11' && user?.subscriptionTier !== 'Ultra Premium') {
      setShowWindowsUpgradePrompt(true);
      return;
    }

    setActiveTab('store');
    setIsInstalling(id);
    setInstallProgress(0);
    
    const initialLogs = id === 'windows11' 
      ? ['Initializing Secure Microsoft Licensing API link...', 'Fetching Retail Digital Signature Certificate...']
      : [`Downloading mirror pools: ${pkg.name}...`, `Installing package binaries...`];
    
    setInstallLogs(initialLogs);

    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      if (prog >= 100) {
        clearInterval(interval);
        setPackages(prev => prev.map(p => p.id === id ? { ...p, isInstalled: true } : p));
        setIsInstalling(null);
        
        const successLines = id === 'windows11'
          ? [
              { type: 'success' as const, text: `Successfully Activated: Windows 11 Pro Lifetime Edition!` },
              { type: 'system' as const, text: `A genuine Digital License has been linked to your Ultra Premium account.` },
              { type: 'system' as const, text: `Type "win11" or click "Launch" to boot the Windows VM environment.` }
            ]
          : id === 'desktop'
          ? [
              { type: 'success' as const, text: `Successfully Installed: GNOME/macOS Desktop-Mode Workspace!` },
              { type: 'system' as const, text: `Type "desktop" or click "Launch" to access your virtual GUI desktop.` }
            ]
          : id === 'ios26'
          ? [
              { type: 'success' as const, text: `Successfully Installed: iOS 26 Simulator Workspace!` },
              { type: 'system' as const, text: `Type "ios26" or click "Launch" to boot the iOS 26 holographic iPhone simulator.` }
            ]
          : id === 'wireshark'
          ? [
              { type: 'success' as const, text: `Successfully Installed: Wireshark Network Protocol Analyzer!` },
              { type: 'system' as const, text: `Type "wireshark" or click "Launch" to start capturing live network packets.` }
            ]
          : id === 'tor'
          ? [
              { type: 'success' as const, text: `Successfully Installed: The Onion Router (Tor) Secure Browser!` },
              { type: 'system' as const, text: `Type "tor" or click "Launch" to open the encrypted onion router workspace.` }
            ]
          : id === 'vpn'
          ? [
              { type: 'success' as const, text: `Successfully Installed: WireGuard Cryptographic VPN Client!` },
              { type: 'system' as const, text: `Type "vpn" or "wireguard" or click "Launch" to configure and activate the cryptographic tunnel.` }
            ]
          : [
              { type: 'success' as const, text: `Successfully installed [${pkg.name}] version ${pkg.version}` },
              { type: 'system' as const, text: `Run package immediately by typing "${pkg.name}" in terminal.` }
            ];

        setTerminalLines(prev => [
          ...prev,
          ...successLines
        ]);
        setActiveWindowApp(id);
        setActiveTab('terminal');
        if (id === 'snake') resetSnakeGame();
      } else {
        setInstallProgress(prog);
        const nextLog = id === 'windows11'
          ? prog === 20 ? '[20%] Digital Signature Verified. Key: W269N-WFGWX-YVC9B-4J6C9-T83GX'
            : prog === 40 ? `[40%] Syncing Lifetime Ownership to user ${user?.email}...`
            : prog === 60 ? '[60%] Allocated QEMU Hypervisor space: 4 Cores CPU & 8GB Memory Virtualization...'
            : '[80%] Extracting Windows 11 NT Kernel image system files...'
          : id === 'desktop'
          ? prog === 20 ? '[20%] Checking Desktop-Mode graphics environment dependency pools...'
            : prog === 40 ? '[40%] Downloading gorgeous vector desktop assets and wallpapers...'
            : prog === 60 ? '[60%] Linking desktop components and loading simulated Linux/macOS workspace...'
            : '[80%] Extracting visual skin layer configurations...'
          : id === 'ios26'
          ? prog === 20 ? '[20%] Verified Apple iOS SDK digital connection...'
            : prog === 40 ? '[40%] Downloading iOS 26 Simulator system image (including holographic siri-v10)...'
            : prog === 60 ? '[60%] Creating iPhone device emulation and frame scaling buffers...'
            : '[80%] Compiling local iOS App sandbox packages...'
          : id === 'wireshark'
          ? prog === 20 ? '[20%] Compiling local packet filter sockets & dynamic libpcap linkage...'
            : prog === 40 ? '[40%] Downloading Kali interactive protocol disassembler dissectors...'
            : prog === 60 ? '[60%] Mounting virtual socket promiscuous capture driver hooks...'
            : '[80%] Syncing GTK/QT desktop layout frame buffers & telemetry layers...'
          : id === 'tor'
          ? prog === 20 ? '[20%] Generating secure SOCKS5 client loopback on 127.0.0.1:9050...'
            : prog === 40 ? '[40%] Fetching Tor Browser security directory consensus mirrors...'
            : prog === 60 ? '[60%] Setting up three-layered cryptographic key handshakes...'
            : '[80%] Bundling Mozilla-based sandbox GUI interface layers...'
          : id === 'vpn'
          ? prog === 20 ? '[20%] Compiling WireGuard kernel module and loading secure network tunnels...'
            : prog === 40 ? '[40%] Fetching Offshore Privacy DNS Resolver node tables...'
            : prog === 60 ? '[60%] Generating curve25519 ECDH local cryptokey pairs...'
            : '[80%] Syncing OpenVPN backup TCP/UDP failover protocol layers...'
          : `[${prog}%] Linking symbolic libs for ${pkg.name}...`;
        setInstallLogs(prev => [...prev, nextLog]);
      }
    }, 400);
  };

  // Python IDE Runner
  const runPythonInGUI = () => {
    setIsPythonRunning(true);
    setPythonOutputs(['Initializing sandbox compiler...']);
    setTimeout(() => {
      const logs: string[] = [];
      const lines = pythonCode.split('\n');
      lines.forEach(l => {
        const trimmed = l.trim();
        if (trimmed.startsWith('print(')) {
          const match = trimmed.match(/print\((["'])(.*?)\1\)/);
          if (match) logs.push(match[2]);
          else logs.push(`Executed output logic of: ${trimmed}`);
        }
      });
      if (logs.length === 0) logs.push('Process exited smoothly with code 0.');
      setPythonOutputs(logs);
      setIsPythonRunning(false);
    }, 800);
  };

  // Snake Loop
  const resetSnakeGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setSnakeDirection('RIGHT');
    setSnakeScore(0);
    setSnakeGameOver(false);
    if (snakeIntervalRef.current) clearInterval(snakeIntervalRef.current);

    snakeIntervalRef.current = setInterval(() => {
      setSnake(prev => {
        if (snakeGameOver) return prev;
        const head = { ...prev[0] };
        switch (snakeDirection) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 15) {
          setSnakeGameOver(true);
          return prev;
        }
        if (prev.some(s => s.x === head.x && s.y === head.y)) {
          setSnakeGameOver(true);
          return prev;
        }

        const nextSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setSnakeScore(s => s + 10);
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 15) });
        } else {
          nextSnake.pop();
        }
        return nextSnake;
      });
    }, 180);
  };

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (activeWindowApp !== 'snake' || snakeGameOver) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp': if (snakeDirection !== 'DOWN') setSnakeDirection('UP'); break;
        case 'ArrowDown': if (snakeDirection !== 'UP') setSnakeDirection('DOWN'); break;
        case 'ArrowLeft': if (snakeDirection !== 'RIGHT') setSnakeDirection('LEFT'); break;
        case 'ArrowRight': if (snakeDirection !== 'LEFT') setSnakeDirection('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => {
      window.removeEventListener('keydown', handleKeys);
      if (snakeIntervalRef.current) clearInterval(snakeIntervalRef.current);
    };
  }, [activeWindowApp, snakeDirection, snakeGameOver]);

  // Matrix screensaver Canvas rendering
  useEffect(() => {
    if (activeWindowApp !== 'matrix' || !matrixCanvasRef.current) return;
    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 250;
    const cols = Math.floor(canvas.width / 14);
    const ypos = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = '12px monospace';

      for (let i = 0; i < ypos.length; i++) {
        const text = String.fromCharCode(Math.floor(Math.random() * 128));
        ctx.fillText(text, i * 14, ypos[i] * 14);
        if (ypos[i] * 14 > canvas.height && Math.random() > 0.975) {
          ypos[i] = 0;
        }
        ypos[i]++;
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, [activeWindowApp]);

  // Docker Sim actions
  const triggerDockerCreate = (img: string) => {
    const id = 'c-' + Math.random().toString(16).substring(2, 6);
    const newCont: DockerContainer = {
      id,
      name: img.split(':')[0] + '-' + Math.floor(Math.random() * 90 + 10),
      image: img,
      status: 'running',
      ports: img.includes('nginx') ? '80:80' : '5432:5432',
      uptime: '1s'
    };
    setDockerContainers(prev => [...prev, newCont]);
    setDockerLogs(prev => [...prev, `[docker] container ${newCont.name} built and launched successfully.`]);
  };

  // Network Scanner sweep
  const triggerNetworkSweep = () => {
    setNetIsScanning(true);
    setNetScanProgress(0);
    setNetDiscoveredNodes([]);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      if (current >= 100) {
        clearInterval(interval);
        setNetIsScanning(false);
        setNetScanProgress(100);
        setNetDiscoveredNodes([
          { ip: '192.168.1.1', host: 'gateway.novaOS', type: 'Router', ping: '0.9ms', ports: ['80', '443'] },
          { ip: '192.168.1.12', host: 'postgres-pool.local', type: 'DB Server', ping: '1.4ms', ports: ['5432'] },
          { ip: '192.168.1.42', host: 'gemini-assist-hyper', type: 'AI Superhost', ping: '10.2ms', ports: ['3000'] }
        ]);
      } else {
        setNetScanProgress(current);
      }
    }, 200);
  };

  // Masscan Simulator Sweep
  const triggerMasscanSweep = () => {
    setMasscanIsScanning(true);
    setMasscanProgress(0);
    setMasscanResults([]);
    setMasscanLogs([
      `starting masscan v1.3.2 (http://github.com/robertdavidgraham/masscan)`,
      ` -- target range: ${masscanTarget}`,
      ` -- ports requested: ${masscanPorts}`,
      ` -- transmission rate: ${masscanRate} packets/sec`,
      `Initializing network interfaces...`,
      `Sniffing range bounds...`
    ]);

    const targetPorts = masscanPorts.split(',').map(p => p.trim()).filter(Boolean);
    const mockIps = [
      '192.168.1.1',
      '192.168.1.15',
      '192.168.1.42',
      '192.168.1.108',
      '192.168.1.150'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setMasscanProgress(currentProgress);

      const logLines = [
        `[${currentProgress}%] Rate: ${masscanRate} pps, ETA: 0:00:02`,
        `Scanning network block...`
      ];

      if (currentProgress === 30) {
        setMasscanResults(prev => [
          ...prev,
          { ip: mockIps[0], port: targetPorts[0] || '80', status: 'open', timestamp: new Date().toISOString().slice(11, 19) }
        ]);
        logLines.push(`Discovered open port ${targetPorts[0] || '80'}/tcp on ${mockIps[0]}`);
      }
      if (currentProgress === 50) {
        setMasscanResults(prev => [
          ...prev,
          { ip: mockIps[1], port: targetPorts[1] || '443', status: 'open', timestamp: new Date().toISOString().slice(11, 19) },
          { ip: mockIps[2], port: targetPorts[2] || '22', status: 'open', timestamp: new Date().toISOString().slice(11, 19) }
        ]);
        logLines.push(`Discovered open port ${targetPorts[1] || '443'}/tcp on ${mockIps[1]}`);
        logLines.push(`Discovered open port ${targetPorts[2] || '22'}/tcp on ${mockIps[2]}`);
      }
      if (currentProgress === 80) {
        setMasscanResults(prev => [
          ...prev,
          { ip: mockIps[3], port: targetPorts[3] || '8080', status: 'open', timestamp: new Date().toISOString().slice(11, 19) }
        ]);
        logLines.push(`Discovered open port ${targetPorts[3] || '8080'}/tcp on ${mockIps[3]}`);
      }

      setMasscanLogs(prev => [...prev, ...logLines]);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setMasscanIsScanning(false);
        setMasscanLogs(prev => [
          ...prev,
          `--- masscan scan complete ---`,
          `Hosts scanned: 256`,
          `Ports found open: ${targetPorts.length > 0 ? '4' : '0'}`
        ]);
      }
    }, 300);
  };

  const runMasscanCLI = async (args: string[]) => {
    setTerminalLines(prev => [
      ...prev,
      { type: 'system', text: 'Initializing masscan asynchronous port sweep...' }
    ]);

    let target = '192.168.1.0/24';
    let ports = '80,443';
    let rate = '10000';

    for (let i = 0; i < args.length; i++) {
      if (args[i] === '-p' || args[i].startsWith('-p')) {
        ports = args[i].startsWith('-p') ? args[i].slice(2) : (args[i + 1] || '80');
      } else if (args[i] === '--rate') {
        rate = args[i + 1] || '10000';
      } else if (!args[i].startsWith('-')) {
        target = args[i];
      }
    }

    setTerminalLines(prev => [
      ...prev,
      { type: 'output', text: `masscan target: ${target}` },
      { type: 'output', text: `masscan ports: ${ports}` },
      { type: 'output', text: `masscan rate limit: ${rate} packets/sec` },
      { type: 'output', text: `Starting scanning sweep...` }
    ]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setTerminalLines(prev => [
      ...prev,
      { type: 'success', text: 'Discovered open port 80/tcp on 192.168.1.1' },
      { type: 'success', text: 'Discovered open port 443/tcp on 192.168.1.12' },
      { type: 'success', text: 'Discovered open port 22/tcp on 192.168.1.42' },
      { type: 'system', text: 'Masscan execution successfully completed.' }
    ]);
  };

  // Kali NetHunter BadUSB injection trigger
  const triggerNhBadUsbInject = () => {
    setNhBadUsbStatus('injecting');
    setNhBadUsbProgress(0);
    setNhBadUsbLogs([
      `[NetHunter BadUSB] Initializing payload engine...`,
      `[NetHunter BadUSB] Emulating device as Keyboard/Mouse HID (Vendor ID: 0x093A, Product ID: 0x2510)...`,
      `[NetHunter BadUSB] Payload selected: ${nhBadUsbPayload}`,
      `[NetHunter BadUSB] Starting keystroke injection sequence...`
    ]);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setNhBadUsbProgress(current);

      const logsToAdd: string[] = [];
      if (current === 20) {
        logsToAdd.push(`[NetHunter BadUSB] Sending keystroke: GUI + R (Run dialogue)`);
        logsToAdd.push(`[NetHunter BadUSB] Waiting 150ms...`);
      } else if (current === 40) {
        logsToAdd.push(`[NetHunter BadUSB] Typing commands: powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden...`);
        logsToAdd.push(`[NetHunter BadUSB] Waiting 300ms...`);
      } else if (current === 60) {
        if (nhBadUsbPayload === 'reverse_shell') {
          logsToAdd.push(`[NetHunter BadUSB] Executing payload stream: \$client = New-Object System.Net.Sockets.TCPClient('192.168.1.42', 4444)...`);
        } else if (nhBadUsbPayload === 'rickroll') {
          logsToAdd.push(`[NetHunter BadUSB] Executing payload: Start-Process "https://www.youtube.com/watch?v=dQw4w9WgXcQ"...`);
        } else {
          logsToAdd.push(`[NetHunter BadUSB] Executing credential harvester script: dump-lsass.ps1...`);
        }
      } else if (current === 80) {
        logsToAdd.push(`[NetHunter BadUSB] Keystroke payload stream fully injected. Closing input channels...`);
      }

      setNhBadUsbLogs(prev => [...prev, ...logsToAdd]);

      if (current >= 100) {
        clearInterval(interval);
        setNhBadUsbStatus('completed');
        setNhBadUsbLogs(prev => [
          ...prev,
          `[NetHunter BadUSB] Keystroke Injection completed successfully.`,
          `[NetHunter BadUSB] Check listener consoles for inbound telemetry shell sessions!`
        ]);
      }
    }, 400);
  };

  // Kali NetHunter WiFi Scan trigger
  const triggerNhWifiScan = () => {
    setNhWifiScanning(true);
    setNhWifiProgress(0);
    setNhWifiResults([]);
    setNhWifiLogs([
      `[NetHunter Wireless] Loading driver firmware for rt2800usb (wlan0)...`,
      `[NetHunter Wireless] Enabling monitor mode on wlan0mon...`,
      `[NetHunter Wireless] Starting passive wireless sniffer sweep (Airodump-ng)...`
    ]);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setNhWifiProgress(current);

      const logsToAdd: string[] = [];
      if (current === 20) {
        logsToAdd.push(`[NetHunter Wireless] Sniffing channel 1, 6, 11 (2.4 GHz)`);
      } else if (current === 60) {
        logsToAdd.push(`[NetHunter Wireless] Sniffing channel 36, 44, 149 (5 GHz)`);
      }

      setNhWifiLogs(prev => [...prev, ...logsToAdd]);

      if (current >= 100) {
        clearInterval(interval);
        setNhWifiScanning(false);
        setNhWifiResults([
          { ssid: 'SecureCorp_Staff', bssid: '7C:8B:CA:11:22:33', signal: '-45 dBm', channel: '1', encryption: 'WPA2-Enterprise', clients: 8 },
          { ssid: 'HomeNet_2.4G', bssid: 'A4:2B:B0:FF:EE:DD', signal: '-62 dBm', channel: '6', encryption: 'WPA2-PSK (AES)', clients: 3 },
          { ssid: 'CoffeeShop_Free_WiFi', bssid: '3E:97:0E:12:34:56', signal: '-75 dBm', channel: '11', encryption: 'Open (Captive)', clients: 12 },
          { ssid: 'SmartLight_Hub', bssid: '00:1A:2B:3C:4D:5E', signal: '-82 dBm', channel: '6', encryption: 'WEP (Shared)', clients: 1 }
        ]);
        setNhWifiLogs(prev => [
          ...prev,
          `[NetHunter Wireless] Scan completed. Discovered 4 local access points.`,
          `[NetHunter Wireless] Monitor mode active. Select an AP target below to execute bad frames.`
        ]);
      }
    }, 300);
  };

  // Kali NetHunter WiFi attack trigger
  const triggerNhWifiAttack = () => {
    if (!nhWifiTarget) return;
    setNhWifiAttackActive(true);
    setNhWifiAttackProgress(0);
    setNhWifiLogs([
      `[NetHunter Wireless] Target AP identified: ${nhWifiTarget}`,
      `[NetHunter Wireless] Attack profile: ${nhWifiAttackType === 'deauth' ? 'Deauthentication Flood (Aireplay-ng)' : 'WPS PIN Brute-force (Reaver)'}`,
      `[NetHunter Wireless] Generating crafted raw packet frames...`
    ]);

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setNhWifiAttackProgress(current);

      const logsToAdd: string[] = [];
      if (nhWifiAttackType === 'deauth') {
        logsToAdd.push(`[Aireplay-ng] Sending 64 deauth frames to broadcast target on channel 6...`);
        if (current === 50) {
          logsToAdd.push(`[Airodump-ng] Sniffing WPA handshake broadcast patterns...`);
        }
        if (current === 80) {
          logsToAdd.push(`[Airodump-ng] WPA Handshake captured! Saved in /root/handshakes/cap-01.cap`);
        }
      } else {
        logsToAdd.push(`[Reaver] Testing WPS PIN: ${Math.floor(Math.random() * 9000 + 1000)}****...`);
        if (current === 70) {
          logsToAdd.push(`[Reaver] PIN prefix matched (1234)! Testing suffix hashes...`);
        }
      }

      setNhWifiLogs(prev => [...prev, ...logsToAdd]);

      if (current >= 100) {
        clearInterval(interval);
        setNhWifiAttackActive(false);
        setNhWifiLogs(prev => [
          ...prev,
          `[NetHunter Wireless] Attack successfully completed.`,
          nhWifiAttackType === 'deauth' 
            ? `[NetHunter Wireless] Success: Sniffed WPA handshake offline cap file! Crackable with "john" command.`
            : `[NetHunter Wireless] Success: Pin matched! Decrypted WPA2 Key: "dragon123"`
        ]);
      }
    }, 400);
  };

  // Kali NetHunter Bluetooth scan trigger
  const triggerNhBtScan = () => {
    setNhBtScanning(true);
    setNhBtProgress(0);
    setNhBtResults([]);
    setNhBtLogs([
      `[NetHunter Bluetooth] Initializing BlueHydra service engine...`,
      `[NetHunter Bluetooth] Upgrading Bluetooth HCI power controls...`,
      `[NetHunter Bluetooth] Passive BLE & Classic beacon sweeps activated...`
    ]);

    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      setNhBtProgress(current);

      const logsToAdd: string[] = [];
      if (current === 25) {
        logsToAdd.push(`[BlueHydra] Scanning BLE advertisement packets...`);
      } else if (current === 75) {
        logsToAdd.push(`[BlueHydra] Resolving service descriptors...`);
      }

      setNhBtLogs(prev => [...prev, ...logsToAdd]);

      if (current >= 100) {
        clearInterval(interval);
        setNhBtScanning(false);
        setNhBtResults([
          { name: 'Root_User\'s iPhone', mac: 'BC:A9:20:11:44:E2', rssi: '-52 dBm', type: 'Smart Phone', services: 'Apple Continuity, Bluetooth Audio' },
          { name: 'Sony WH-1000XM4', mac: '38:18:A2:CC:DD:01', rssi: '-68 dBm', type: 'Audio Headset', services: 'A2DP Source, AVRCP Controller' },
          { name: 'Fitbit Charge 5', mac: '00:23:FE:12:9A:8B', rssi: '-85 dBm', type: 'Wearable Fitness', services: 'Low Energy Battery, Step Sync' }
        ]);
        setNhBtLogs(prev => [
          ...prev,
          `[NetHunter Bluetooth] Discovery completed. Discovered 3 active local Bluetooth devices.`,
          `[NetHunter Bluetooth] High precision BLE tracker telemetry cached.`
        ]);
      }
    }, 300);
  };

  const runNethunterCLI = async (args: string[]) => {
    setTerminalLines(prev => [
      ...prev,
      { type: 'system', text: 'Initializing Kali NetHunter mobile platform core...' }
    ]);

    setActiveWindowApp('nethunter');

    setTerminalLines(prev => [
      ...prev,
      { type: 'success', text: 'NetHunter virtual applet successfully launched.' },
      { type: 'success', text: 'Explore BadUSB payload injection, Wi-Fi monitor, and Bluetooth sniffer.' }
    ]);
  };

  // Nmap Simulator Sweep
  const triggerNmapSweep = () => {
    setNmapIsScanning(true);
    setNmapProgress(0);
    setNmapResults(null);
    setNmapLogs([`Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC`]);

    const scanTypeName = nmapScanType === 'sS' ? 'SYN Stealth' :
                        nmapScanType === 'sT' ? 'TCP Connect' :
                        nmapScanType === 'sV' ? 'Service Version' :
                        nmapScanType === 'O' ? 'OS Detection' : 'Script Vulnerability';

    const logsList = [
      `Initiating Ping Scan against ${nmapTarget}...`,
      "Scanning 1 host...",
      `Initiating Parallel DNS resolution of 1 target...`,
      "Completed Parallel DNS resolution...",
      `Initiating ${scanTypeName} Scan against ports 1-1000...`,
      "Discovered open port 22/tcp...",
      "Discovered open port 80/tcp...",
      "Discovered open port 443/tcp...",
      "Discovered open port 3000/tcp...",
      `Completed ${scanTypeName} Scan successfully.`
    ];

    if (nmapScanType === 'sV') {
      logsList.push("Initiating Service scan against 4 open ports...");
      logsList.push("Service probe version matching complete (Apache, OpenSSH, nginx, Node).");
    }
    if (nmapScanType === 'O') {
      logsList.push("Initiating OS detection (fingerprinting active kernel and TCP stacks)...");
      logsList.push("Device matches: General Purpose Linux kernel 6.x stack.");
    }
    if (nmapScanType === 'sC') {
      logsList.push("Initiating default script scan (ssl-cert, http-title, ssh-hostkey)...");
      logsList.push("Script scan completed successfully with advisory warnings.");
    }

    logsList.push(`Nmap scan report completed for target: ${nmapTarget}`);

    let index = 0;
    const interval = setInterval(() => {
      if (index < logsList.length) {
        setNmapLogs(prev => [...prev, logsList[index]]);
        setNmapProgress(Math.floor(((index + 1) / logsList.length) * 100));
        index++;
      } else {
        clearInterval(interval);
        setNmapIsScanning(false);
        setNmapProgress(100);

        const finalIp = nmapTarget === 'scanme.nmap.org' ? '45.33.32.156' :
                        nmapTarget === 'gateway.novaOS' || nmapTarget === '192.168.1.1' ? '192.168.1.1' :
                        nmapTarget.match(/^\d+\.\d+\.\d+\.\d+$/) ? nmapTarget : '104.244.42.1';

        setNmapResults({
          host: nmapTarget,
          ip: finalIp,
          status: 'Up',
          latency: (Math.random() * 0.05 + 0.01).toFixed(3) + 's',
          os: nmapScanType === 'O' ? 'Linux 6.8.0-45-generic' : undefined,
          ports: [
            { port: '22', state: 'open', service: 'ssh', version: nmapScanType === 'sV' ? 'OpenSSH 8.2p1 Ubuntu' : 'OpenSSH', vuln: nmapScanType === 'sC' ? 'ssh-hostkey: 2048 b6:55:01:85 (RSA) | 256 d1:35:b6:93 (ECDSA)' : undefined },
            { port: '80', state: 'open', service: 'http', version: nmapScanType === 'sV' ? 'Apache httpd 2.4.41' : 'Apache', vuln: nmapScanType === 'sC' ? 'http-title: NovaOS Virtual Gateway Page' : undefined },
            { port: '443', state: 'open', service: 'ssl/http', version: nmapScanType === 'sV' ? 'nginx 1.24.0 (SSL)' : 'nginx', vuln: nmapScanType === 'sC' ? 'ssl-cert: Subject: commonName=novaos.local (Self-signed Certificate)' : undefined },
            { port: '3000', state: 'open', service: 'node-dev', version: nmapScanType === 'sV' ? 'Express/Vite Server' : 'Express', vuln: nmapScanType === 'sC' ? 'Vite Hot Module Replacement websocket open listener' : undefined }
          ]
        });
      }
    }, 200);
  };

  const runNmapCLI = async (args: string[]) => {
    setIsShellWaiting(true);
    setTerminalLines(prev => [...prev, { type: 'system', text: `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC` }]);

    let target = 'scanme.nmap.org';
    let scanTypeName = 'SYN Stealth';
    let detectOS = false;
    let detectService = false;
    let runScripts = false;

    args.forEach(arg => {
      if (arg.startsWith('-')) {
        if (arg.includes('sS')) scanTypeName = 'SYN Stealth';
        if (arg.includes('sT')) scanTypeName = 'Connect';
        if (arg.includes('sV')) { scanTypeName = 'Service Version'; detectService = true; }
        if (arg.includes('O')) { detectOS = true; }
        if (arg.includes('sC')) { runScripts = true; }
      } else {
        target = arg;
      }
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    const ip = target === 'scanme.nmap.org' ? '45.33.32.156' :
               target === 'gateway.novaOS' || target === '192.168.1.1' ? '192.168.1.1' :
               target.match(/^\d+\.\d+\.\d+\.\d+$/) ? target : '104.244.42.1';

    const latency = (Math.random() * 0.05 + 0.01).toFixed(3) + 's';

    const lines: TerminalLine[] = [
      { type: 'output', text: `Nmap scan report for ${target} (${ip})` },
      { type: 'output', text: `Host is up (${latency} latency).` },
      { type: 'output', text: 'Not shown: 996 closed tcp ports (reset)' },
      { type: 'output', text: 'PORT     STATE SERVICE VERSION' }
    ];

    const ports = [
      { port: '22/tcp', state: 'open', service: 'ssh', version: detectService ? 'OpenSSH 8.2p1 Ubuntu 4ubuntu0.5' : 'OpenSSH' },
      { port: '80/tcp', state: 'open', service: 'http', version: detectService ? 'Apache httpd 2.4.41' : 'Apache' },
      { port: '443/tcp', state: 'open', service: 'ssl/http', version: detectService ? 'nginx 1.24.0 (SSL active)' : 'nginx' },
      { port: '3000/tcp', state: 'open', service: 'node-dev', version: detectService ? 'Vite+Express Applet Server' : 'Express' }
    ];

    ports.forEach(p => {
      const portCol = p.port.padEnd(9);
      const stateCol = p.state.padEnd(6);
      const serviceCol = p.service.padEnd(8);
      lines.push({ type: 'success', text: `${portCol} ${stateCol} ${serviceCol} ${p.version}` });

      if (runScripts) {
        if (p.port === '22/tcp') {
          lines.push({ type: 'system', text: '|_ssh-hostkey: 2048 b6:55:01:85 (RSA) | 256 d1:35:b6:93 (ECDSA)' });
        } else if (p.port === '80/tcp') {
          lines.push({ type: 'system', text: '|_http-title: NovaOS Virtual Gateway Page' });
          lines.push({ type: 'system', text: '|_http-methods: GET HEAD POST OPTIONS' });
        } else if (p.port === '443/tcp') {
          lines.push({ type: 'system', text: '|_ssl-cert: Subject: commonName=novaos.local' });
        }
      }
    });

    if (detectOS) {
      lines.push({ type: 'output', text: 'Device type: general purpose' });
      lines.push({ type: 'output', text: 'Running: Linux 5.X | 6.X' });
      lines.push({ type: 'output', text: 'OS CPE: cpe:/o:linux:linux_kernel:6.8' });
      lines.push({ type: 'output', text: 'OS details: Linux 6.8.0-45-generic' });
    }

    lines.push({ type: 'system', text: `Nmap done: 1 IP address (1 host up) scanned in ${(Math.random() * 1.5 + 1.2).toFixed(2)} seconds` });

    setTerminalLines(prev => [...prev, ...lines]);
    setIsShellWaiting(false);
  };

  // Kali Metasploit Exploit Simulator
  const triggerMetasploitExploit = () => {
    setMsfIsRunning(true);
    setMsfSessionActive(false);
    setMsfLogs([`[*] Exploit running as background job 0.`, `[*] Exploit targets: ${msfTarget}`, `[*] Using payload: ${msfPayload}`]);
    
    setTimeout(() => {
      setMsfLogs(prev => [...prev, `[*] Connecting to target system ${msfTarget}:445...`, `[+] Connected! Authenticating anonymous SMB session...`]);
    }, 800);

    setTimeout(() => {
      setMsfLogs(prev => [...prev, `[*] Attempting to bypass validation checks...`, `[+] Triggering vulnerability payload buffers...`]);
    }, 1600);

    setTimeout(() => {
      setMsfLogs(prev => [...prev, `[*] Sending stage (200262 bytes) to ${msfTarget}...`]);
    }, 2400);

    setTimeout(() => {
      setMsfLogs(prev => [...prev, `[+] Meterpreter session 1 opened (${msfTarget} -> 192.168.1.42:4444) at ${new Date().toISOString()}`]);
      setMsfIsRunning(false);
      setMsfSessionActive(true);
    }, 3200);
  };

  const handleMeterpreterCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = msfCmdInput.trim();
    if (!cmd) return;

    setMsfCmdOutput(prev => [...prev, `meterpreter > ${cmd}`]);
    setMsfCmdInput('');

    setTimeout(() => {
      const parts = cmd.toLowerCase().split(' ');
      const base = parts[0];
      if (base === 'sysinfo') {
        setMsfCmdOutput(prev => [
          ...prev,
          `Computer        : TARGET-DC-01`,
          `OS              : Windows Server 2016 (10.0 Build 14393).`,
          `Architecture    : x64`,
          `System Language : en_US`,
          `Domain          : AD-NOVA-CORP`,
          `Meterpreter     : x64/windows`
        ]);
      } else if (base === 'hashdump') {
        setMsfCmdOutput(prev => [
          ...prev,
          `Administrator:500:aad3b435b51404eeaad3b435b51404ee:fWbY7N3aU8d2s9P0m1K2:::`,
          `Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c:::`,
          `krbtgt:502:aad3b435b51404eeaad3b435b51404ee:83f982d6112a4bcf39de:::`
        ]);
      } else if (base === 'shell') {
        setMsfCmdOutput(prev => [
          ...prev,
          `[*] Spawning sub-shell prompt...`,
          `C:\\Windows\\system32>`,
          `Type "exit" to close the subshell and return to Meterpreter.`
        ]);
      } else if (base === 'help') {
        setMsfCmdOutput(prev => [
          ...prev,
          `Core Commands`,
          `=============`,
          `    help       - Display help menu`,
          `    sysinfo    - Prints system information parameters`,
          `    hashdump   - Dumps security account manager database hashes`,
          `    shell      - Spawns a standard interactive Windows cmd.exe prompt`,
          `    exit       - Terminate the meterpreter session`
        ]);
      } else if (base === 'exit') {
        setMsfSessionActive(false);
        setMsfCmdOutput(['meterpreter > type sysinfo for info, shell for system root prompt']);
      } else {
        setMsfCmdOutput(prev => [...prev, `unknown command: ${cmd}. Type "help" for a list of valid commands.`]);
      }
    }, 150);
  };

  // Kali Hydra Attack Simulator
  const triggerHydraAttack = () => {
    setHydraIsRunning(true);
    setHydraProgress(0);
    setHydraCracked(null);
    setHydraLogs([`Hydra v9.5 (c) 2026 by van Hauser/THC - for legal usage only`, `[*] Attacking target: ${hydraTarget}`, `[*] Using protocol: ${hydraService.toUpperCase()} on port ${hydraService === 'ssh' ? '22' : hydraService === 'ftp' ? '21' : '80'}`]);

    let curr = 0;
    const interval = setInterval(() => {
      curr += 10;
      setHydraProgress(curr);
      
      if (curr === 20) {
        setHydraLogs(prev => [...prev, `[INFO] Load wordlist: ${hydraWordlist === 'rockyou' ? '14,344,392' : '1,000'} combinations loaded.`]);
      } else if (curr === 40) {
        setHydraLogs(prev => [...prev, `[ATTACK] Starting parallel jobs (16 workers)...`, `[TRY] User: ${hydraUser} | Password: password123 (FAILED)`]);
      } else if (curr === 60) {
        setHydraLogs(prev => [...prev, `[TRY] User: ${hydraUser} | Password: guest123 (FAILED)`, `[TRY] User: ${hydraUser} | Password: letmein1 (FAILED)`]);
      } else if (curr === 80) {
        setHydraLogs(prev => [...prev, `[TRY] User: ${hydraUser} | Password: dragon123 (FAILED)`]);
      } else if (curr >= 100) {
        clearInterval(interval);
        setHydraIsRunning(false);
        const pass = hydraService === 'ssh' ? 'admin' : hydraService === 'ftp' ? 'toor' : 'novaOSpass77';
        setHydraLogs(prev => [
          ...prev,
          `[SUCCESS] Cracked 1 target combo!`,
          `[${hydraService.toUpperCase()}] host: ${hydraTarget} | login: ${hydraUser} | password: ${pass}`
        ]);
        setHydraCracked(pass);
      }
    }, 300);
  };

  // Kali John Hash Cracker Simulator
  const triggerJohnCrack = () => {
    setJohnIsRunning(true);
    setJohnProgress(0);
    setJohnCracked(null);
    setJohnLogs([
      `John the Ripper 1.9.0-jumbo-1 (GNU/Linux x86_64)`,
      `[*] Loaded 1 password hash (bcrypt / SHA512)`,
      `[*] Ready to run in standard dictionary configuration...`
    ]);

    let curr = 0;
    const interval = setInterval(() => {
      curr += 12.5;
      setJohnProgress(Math.min(100, curr));

      if (curr === 25) {
        setJohnLogs(prev => [...prev, `[*] Starting rule-based optimization...`, `[*] Testing common password prefixes and years...`]);
      } else if (curr === 50) {
        setJohnLogs(prev => [...prev, `rockyou.txt: 40% complete (4,521 hashes/sec)`]);
      } else if (curr === 75) {
        setJohnLogs(prev => [...prev, `rockyou.txt: 85% complete (5,120 hashes/sec)`]);
      } else if (curr >= 100) {
        clearInterval(interval);
        setJohnIsRunning(false);
        // Look up if user typed administrator hash or customized it
        let crackedVal = 'dragon123';
        if (johnHash.includes('fWbY7N3aU8d2s9P0m1K2')) {
          crackedVal = 'dragon123';
        } else {
          crackedVal = 'pass123';
        }
        setJohnLogs(prev => [
          ...prev,
          `[+] 1 password hash cracked successfully!`,
          `Hash: ${johnHash.slice(0, 16)}... -> "${crackedVal}"`
        ]);
        setJohnCracked(crackedVal);
      }
    }, 250);
  };

  // Theme Style Mappings
  const getThemeClasses = () => {
    switch (terminalTheme) {
      case 'classic': return { bg: 'bg-black text-green-400 border-green-950', prompt: 'text-green-500 font-bold', input: 'text-green-300 font-mono' };
      case 'cyberpunk': return { bg: 'bg-[#0f0c1b] text-cyan-300 border-pink-900/30', prompt: 'text-pink-500 font-bold', input: 'text-pink-300 font-mono' };
      case 'matrix': return { bg: 'bg-black text-emerald-500 border-emerald-950', prompt: 'text-emerald-600 font-bold', input: 'text-emerald-300' };
      case 'monokai': return { bg: 'bg-[#272822] text-[#F8F8F2] border-[#49483e]', prompt: 'text-[#A6E22E] font-bold', input: 'text-[#E6DB74]' };
      case 'kali': return { bg: 'bg-[#0f141c] text-[#7fc4ff] border-[#1f2836]', prompt: 'text-[#ff5555] font-black', input: 'text-[#f8f8f2]' };
      default: return { bg: 'bg-slate-950 text-orange-200 border-orange-950', prompt: 'text-orange-400 font-bold', input: 'text-white' };
    }
  };

  const themeStyle = getThemeClasses();

  return (
    <div id="linux-sim-root" className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-slate-950 p-4 md:p-6 text-slate-800 dark:text-slate-100">
      
      {/* OS Dashboard Header */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
            <Monitor className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-display font-black text-base tracking-tight">NovaOS-Desktop v24.04</h2>
            <p className="text-[10px] text-slate-500 font-mono">Kernel Linux 6.8 | x86_64 Core</p>
          </div>
        </div>

        {/* Live specs */}
        <div className="flex items-center gap-4 text-xs font-mono justify-center md:justify-start">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
            <Cpu className="w-3.5 h-3.5 text-orange-500" />
            <span>CPU {cpuUsage}%</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
            <Database className="w-3.5 h-3.5 text-indigo-500" />
            <span>RAM {ramUsage}G / 8G</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>UPTIME {uptime}</span>
          </div>
        </div>

        {/* Workspace Selector */}
        <div className="flex justify-end items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/5 max-w-fit justify-self-end">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'terminal' ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500'
            }`}
          >
            Terminal
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'store' ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500'
            }`}
          >
            Software Store
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-hidden">
        
        {/* Package Store Panel */}
        <div className={`lg:col-span-4 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-4 shadow-sm min-h-0 overflow-hidden ${
          activeTab === 'store' ? 'block' : 'hidden lg:flex'
        }`}>
          <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100 dark:border-slate-800">
            <Layers className="w-4 h-4 text-orange-500" />
            <h3 className="font-display font-black text-xs tracking-wider uppercase">NovaOS APT Repository</h3>
          </div>

          {isInstalling && (
            <div className="p-3 mb-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs">
              <div className="flex justify-between font-bold text-orange-500 mb-1.5">
                <span>apt-get install {isInstalling}...</span>
                <span>{installProgress}%</span>
              </div>
              <div className="bg-black/95 p-2 rounded text-[9px] font-mono h-16 overflow-y-auto space-y-0.5 text-green-400">
                {installLogs.map((log, i) => <div key={i}>{log}</div>)}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {packages.map(pkg => {
              const isWin11 = pkg.id === 'windows11';
              const isLockedWin = isWin11 && user?.subscriptionTier !== 'Ultra Premium';
              
              return (
                <div 
                  key={pkg.id} 
                  className={`p-3 rounded-xl border flex justify-between gap-2 items-start transition-all ${
                    isWin11 
                      ? 'bg-gradient-to-tr from-amber-500/5 via-purple-500/5 to-indigo-500/5 border-amber-500/40 dark:border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.05)]' 
                      : 'border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-1.5">
                      {isWin11 && <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />}
                      <span className={`font-bold text-xs font-mono ${isWin11 ? 'text-amber-600 dark:text-amber-400' : ''}`}>{pkg.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">v{pkg.version}</span>
                      {pkg.isInstalled && (
                        <span className="text-[9px] bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 font-bold px-1 py-0.2 rounded">installed</span>
                      )}
                      {isWin11 && (
                        <span className="text-[8px] bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black px-1.5 py-0.2 rounded uppercase tracking-wider">Ultra Premium exclusive</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-tight">{pkg.description}</p>
                    {isLockedWin && (
                      <p className="text-[9px] text-amber-500 font-bold mt-1.5 flex items-center gap-1">
                        🔒 Upgrade to Ultra Premium tier to install this package.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (isLockedWin) {
                        setShowWindowsUpgradePrompt(true);
                      } else {
                        pkg.isInstalled ? (setActiveWindowApp(pkg.id), setActiveTab('terminal')) : triggerPackageInstall(pkg.id);
                      }
                    }}
                    disabled={isInstalling !== null && isInstalling !== pkg.id}
                    className={`px-2.5 py-1.5 text-[10px] font-bold rounded transition-all cursor-pointer shadow-sm ${
                      pkg.isInstalled 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
                        : isLockedWin 
                        ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white hover:opacity-90 animate-shimmer' 
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {pkg.isInstalled ? 'Launch' : isLockedWin ? 'Upgrade & Install' : 'Install'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal/App Console Panel */}
        <div className={`lg:col-span-8 flex flex-col min-h-0 overflow-hidden ${activeTab === 'terminal' ? 'block' : 'hidden lg:block'}`}>
          
          {/* Active app sub-canvas window */}
          {activeWindowApp && (
            <div className="mb-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow shadow-slate-900/10 overflow-hidden flex flex-col">
              <div className="bg-slate-100 dark:bg-slate-950 px-4 py-2 border-b border-slate-250 dark:border-slate-850 flex items-center justify-between text-xs font-mono font-bold">
                <div className="flex gap-1.5 items-center">
                  <button onClick={() => setActiveWindowApp(null)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-700 dark:text-slate-300 uppercase tracking-wider">NovaOS-GUI: {activeWindowApp}</span>
                </div>
                <button onClick={() => setActiveWindowApp(null)} className="text-[10px] text-slate-500 hover:text-slate-300 font-normal">Close</button>
              </div>

              <div className={`${['windows11', 'desktop', 'ios26'].includes(activeWindowApp || '') ? 'p-0 bg-slate-950' : 'p-4 bg-slate-950'} min-h-[220px] max-h-[380px] overflow-y-auto text-white scrollbar-none`}>
                
                {/* 12. Windows 11 Pro Lifetime Edition Simulator */}
                {activeWindowApp === 'windows11' && (
                  <div className="relative w-full h-[360px] select-none bg-gradient-to-tr from-[#0a1128] via-[#002244] to-[#1a365d] flex flex-col font-sans text-white shadow-2xl overflow-hidden">
                    {/* Desktop Workspace */}
                    <div className="flex-1 relative p-4 flex flex-col flex-wrap gap-4 items-start content-start" onClick={() => setWin11StartMenuOpen(false)}>
                      
                      {/* Interactive Desktop Icons */}
                      <div 
                        onClick={(e) => { e.stopPropagation(); setWin11ActiveApp('settings'); setWin11StartMenuOpen(false); }}
                        className="p-1 rounded hover:bg-white/10 transition-colors flex flex-col items-center gap-1 text-center w-16 cursor-pointer"
                      >
                        <WinSettings className="w-8 h-8 text-sky-400" />
                        <span className="text-[10px] tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-tight">Settings</span>
                      </div>

                      <div 
                        onClick={(e) => { e.stopPropagation(); setWin11ActiveApp('cmd'); setWin11StartMenuOpen(false); }}
                        className="p-1 rounded hover:bg-white/10 transition-colors flex flex-col items-center gap-1 text-center w-16 cursor-pointer"
                      >
                        <TermIcon className="w-8 h-8 text-slate-200" />
                        <span className="text-[10px] tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-tight">Command Prompt</span>
                      </div>

                      <div 
                        onClick={(e) => { e.stopPropagation(); setWin11ActiveApp('license'); setWin11StartMenuOpen(false); }}
                        className="p-1 rounded hover:bg-white/10 transition-colors flex flex-col items-center gap-1 text-center w-16 cursor-pointer"
                      >
                        <Key className="w-8 h-8 text-amber-400 animate-pulse" />
                        <span className="text-[10px] tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-tight">Activation License</span>
                      </div>

                      <div 
                        onClick={(e) => { e.stopPropagation(); setWin11ActiveApp('edge'); setWin11StartMenuOpen(false); }}
                        className="p-1 rounded hover:bg-white/10 transition-colors flex flex-col items-center gap-1 text-center w-16 cursor-pointer"
                      >
                        <Globe className="w-8 h-8 text-cyan-300" />
                        <span className="text-[10px] tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-tight">Microsoft Edge</span>
                      </div>

                      <div 
                        onClick={(e) => { e.stopPropagation(); setWin11ActiveApp('store'); setWin11StartMenuOpen(false); }}
                        className="p-1 rounded hover:bg-white/10 transition-colors flex flex-col items-center gap-1 text-center w-16 cursor-pointer"
                      >
                        <ShoppingBag className="w-8 h-8 text-pink-400" />
                        <span className="text-[10px] tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-tight">Store</span>
                      </div>

                      <div 
                        onClick={(e) => { e.stopPropagation(); setWin11ActiveApp('notepad'); setWin11StartMenuOpen(false); }}
                        className="p-1 rounded hover:bg-white/10 transition-colors flex flex-col items-center gap-1 text-center w-16 cursor-pointer"
                      >
                        <FileText className="w-8 h-8 text-amber-100" />
                        <span className="text-[10px] tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-tight">Notepad</span>
                      </div>

                      {/* Active Application Window overlay inside the Desktop */}
                      {win11ActiveApp && (
                        <div 
                          className="absolute inset-x-4 top-4 bottom-4 bg-[#1e1e1e] border border-slate-700 rounded-xl shadow-2xl flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Window Header */}
                          <div className="bg-[#2d2d2d] px-3 py-1.5 flex justify-between items-center text-[10px] font-bold border-b border-slate-800 rounded-t-xl select-none">
                            <div className="flex items-center gap-1.5 text-slate-200">
                              {win11ActiveApp === 'settings' && <WinSettings className="w-3.5 h-3.5 text-sky-400" />}
                              {win11ActiveApp === 'cmd' && <TermIcon className="w-3.5 h-3.5 text-slate-400" />}
                              {win11ActiveApp === 'license' && <Key className="w-3.5 h-3.5 text-amber-400" />}
                              {win11ActiveApp === 'edge' && <Globe className="w-3.5 h-3.5 text-cyan-400" />}
                              {win11ActiveApp === 'store' && <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />}
                              {win11ActiveApp === 'notepad' && <FileText className="w-3.5 h-3.5 text-amber-200" />}
                              <span className="uppercase tracking-wide">
                                {win11ActiveApp === 'settings' && 'Windows Settings - System Info'}
                                {win11ActiveApp === 'cmd' && 'Command Prompt (cmd.exe)'}
                                {win11ActiveApp === 'license' && 'Digital License Activation Panel'}
                                {win11ActiveApp === 'edge' && 'Microsoft Edge - AI Copilot Search'}
                                {win11ActiveApp === 'store' && 'Microsoft Store - Premium Suite'}
                                {win11ActiveApp === 'notepad' && 'Notepad - Local Editor'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button onClick={() => setWin11ActiveApp(null)} className="w-4 h-4 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center text-[8px] text-white">×</button>
                            </div>
                          </div>

                          {/* Window Body */}
                          <div className="flex-1 overflow-y-auto p-3 text-[11px] leading-relaxed">
                            {/* Command Prompt */}
                            {win11ActiveApp === 'cmd' && (
                              <div className="font-mono text-slate-300 h-full flex flex-col justify-between">
                                <div className="flex-grow overflow-y-auto space-y-1 pr-1 max-h-[170px]">
                                  {win11CmdLines.map((line, idx) => (
                                    <div key={idx} className="whitespace-pre-wrap">{line}</div>
                                  ))}
                                </div>
                                <form onSubmit={handleWin11CmdSubmit} className="flex gap-1.5 border-t border-slate-800 pt-2 items-center">
                                  <span className="text-slate-400">C:\Users\UltraUser&gt;</span>
                                  <input 
                                    type="text"
                                    value={win11CmdInput}
                                    onChange={(e) => setWin11CmdInput(e.target.value)}
                                    className="bg-transparent border-none text-white focus:outline-none flex-grow font-mono text-[11px]"
                                    autoFocus
                                    placeholder="Type 'help'..."
                                  />
                                </form>
                              </div>
                            )}

                            {/* Settings */}
                            {win11ActiveApp === 'settings' && (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-full">
                                <div className="md:col-span-1 border-r border-slate-800 pr-2 space-y-1 text-slate-400 text-[10px]">
                                  <div className="bg-sky-500/15 text-sky-400 font-bold p-1 rounded">System Info</div>
                                  <div className="p-1 hover:text-white rounded transition-colors cursor-pointer">Personalization</div>
                                  <div className="p-1 hover:text-white rounded transition-colors cursor-pointer">Accounts</div>
                                  <div className="p-1 hover:text-white rounded transition-colors cursor-pointer">Windows Update</div>
                                </div>
                                <div className="md:col-span-3 space-y-2.5">
                                  <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                                    <div>
                                      <span className="font-bold text-white text-xs">NOVA-PC-PRO</span>
                                      <div className="text-[10px] text-slate-500">Device specs and parameters</div>
                                    </div>
                                    <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded">Active Lifetime Account</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                                    <div><span className="text-slate-500">OS Edition:</span> Windows 11 Pro</div>
                                    <div><span className="text-slate-500">Version:</span> 23H2 (Build 22631)</div>
                                    <div><span className="text-slate-500">Processor:</span> Intel Xeon Gemini Core (Simulated)</div>
                                    <div><span className="text-slate-500">Memory:</span> 16.0 GB (Buffered)</div>
                                    <div><span className="text-slate-500">License:</span> Retail Digital Key</div>
                                    <div><span className="text-slate-500">Activation:</span> Permanently Licensed</div>
                                  </div>
                                  <div className="p-2 bg-slate-900 border border-slate-800 rounded text-[9.5px] text-slate-400 leading-normal">
                                    This environment operates on premium allocated resources linked to user <span className="text-amber-400 font-bold">{user?.email}</span>.
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Activation Cert */}
                            {win11ActiveApp === 'license' && (
                              <div className="flex flex-col items-center justify-center h-full text-center p-2">
                                <div className="p-3 border-2 border-dashed border-amber-400/40 rounded-2xl bg-gradient-to-tr from-amber-500/5 to-purple-500/5 max-w-sm relative">
                                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider shadow">OFFICIAL CERTIFICATE</span>
                                  <h4 className="text-amber-400 font-black tracking-widest uppercase text-[12px] mt-1.5">Genuine License Key</h4>
                                  <div className="my-3 py-1 px-3 bg-black/60 rounded border border-slate-800 font-mono text-slate-300 select-all font-bold tracking-wider text-xs">
                                    W269N-WFGWX-YVC9B-4J6C9-T83GX
                                  </div>
                                  <div className="text-[10px] text-slate-400 space-y-1">
                                    <div><strong className="text-emerald-400">✓ Status:</strong> Permanently Activated (Retail)</div>
                                    <div><strong className="text-emerald-400">✓ Lifetime Guarantee:</strong> Linked to <span className="text-slate-200 underline font-semibold">{user?.email}</span></div>
                                    <div><strong className="text-emerald-400">✓ VIP Access:</strong> Includes Hyper-V, BitLocker & Windows Sandbox</div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Edge Browser */}
                            {win11ActiveApp === 'edge' && (
                              <div className="flex flex-col h-full justify-between">
                                <form onSubmit={handleWin11Search} className="flex gap-2 bg-slate-900 border border-slate-800 rounded p-1">
                                  <input 
                                    type="text" 
                                    value={win11SearchQuery}
                                    onChange={(e) => setWin11SearchQuery(e.target.value)}
                                    className="bg-transparent border-none text-white focus:outline-none flex-grow font-sans text-[11px] px-2"
                                    placeholder="Ask Copilot AI anything... (e.g. explain license details)"
                                  />
                                  <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-1 rounded text-[10px] cursor-pointer animate-pulse">Search</button>
                                </form>
                                <div className="flex-grow mt-2.5 bg-black/40 border border-slate-800 rounded p-2.5 overflow-y-auto max-h-[140px] text-[10px] font-sans">
                                  {win11SearchLoading ? (
                                    <div className="flex items-center gap-2 text-sky-400 font-bold animate-pulse py-4">
                                      <Loader2 className="w-4 h-4 animate-spin" /> Gathering premium intelligence...
                                    </div>
                                  ) : win11SearchResults.length > 0 ? (
                                    <div className="space-y-1.5 text-slate-300 leading-normal">
                                      {win11SearchResults.map((r, i) => (
                                        <div key={i} className={i === 0 ? "font-bold text-amber-400 text-xs border-b border-slate-800 pb-1 mb-1.5" : ""}>{r}</div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-slate-500 italic text-center py-6">
                                      Copilot is standing by. Type a prompt above to browse or research via high-speed AI routing.
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Microsoft Store */}
                            {win11ActiveApp === 'store' && (
                              <div className="space-y-2.5">
                                <div className="border-b border-slate-800 pb-1 flex justify-between items-center">
                                  <span className="font-bold text-white text-xs">Microsoft Store Bundle Apps</span>
                                  <span className="text-[9px] bg-pink-500/10 text-pink-400 font-bold px-1.5 py-0.2 rounded">Ultra Bundle Active</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                                  {[
                                    { name: 'Word & Excel Pro', desc: 'Full offline suites pre-loaded', size: '1.2 GB' },
                                    { name: 'Visual Studio Code', desc: 'Integrated developer workspace', size: '420 MB' },
                                    { name: 'PowerShell Terminal', desc: 'Administrative shell console', size: '45 MB' },
                                    { name: 'MS Flight Simulator', desc: '8K graphics scenery hyper-glide', size: '120 GB' },
                                    { name: 'Minecraft Windows Edition', desc: 'Infinite voxel creative worlds', size: '1.4 GB' },
                                    { name: 'DirectX 12 Ultimate', desc: 'Simulated neural graphics engine', size: '210 MB' }
                                  ].map((app, idx) => (
                                    <div key={idx} className="p-1.5 rounded bg-slate-900 border border-slate-800/80 flex justify-between items-center text-[10px]">
                                      <div>
                                        <span className="font-bold text-slate-200">{app.name}</span>
                                        <div className="text-[9px] text-slate-500 mt-0.5">{app.desc}</div>
                                      </div>
                                      <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded whitespace-nowrap">Installed</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Notepad */}
                            {win11ActiveApp === 'notepad' && (
                              <div className="flex flex-col h-full justify-between gap-2">
                                <textarea 
                                  value={win11NotepadText}
                                  onChange={(e) => setWin11NotepadText(e.target.value)}
                                  className="w-full bg-[#f8f9fa] text-slate-900 font-mono text-[10.5px] p-2 rounded focus:outline-none h-[120px] resize-none"
                                />
                                <div className="text-[9px] text-slate-500 font-mono text-right">
                                  Encoding: UTF-8 | Characters: {win11NotepadText.length}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Windows 11 Start Menu popover */}
                    {win11StartMenuOpen && (
                      <div className="w-80 bg-[#1e1e1ec2] border border-slate-800 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex flex-col justify-between absolute bottom-14 left-1/2 -translate-x-1/2 z-20 animate-in slide-in-from-bottom-4 fade-in duration-150">
                        {/* Search in start menu */}
                        <div className="bg-[#111] rounded-lg p-1.5 flex items-center gap-2 mb-3.5 border border-slate-800/60">
                          <Search className="w-3.5 h-3.5 text-slate-400" />
                          <input 
                            type="text"
                            placeholder="Type to search..."
                            className="bg-transparent text-[10px] text-white focus:outline-none flex-1 font-sans"
                            onClick={(e) => { e.stopPropagation(); setWin11ActiveApp('edge'); setWin11StartMenuOpen(false); }}
                            readOnly
                          />
                        </div>

                        {/* Pinned apps 3x4 grid */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold tracking-wider px-1">
                            <span>Pinned Applications</span>
                            <span className="text-sky-400 hover:underline cursor-pointer text-[9px]">All apps &gt;</span>
                          </div>
                          <div className="grid grid-cols-4 gap-y-3.5 gap-x-1 text-center py-2">
                            {[
                              { label: 'Edge', icon: <Globe className="w-6 h-6 text-cyan-300" />, action: 'edge' },
                              { label: 'Settings', icon: <WinSettings className="w-6 h-6 text-sky-400" />, action: 'settings' },
                              { label: 'License', icon: <Key className="w-6 h-6 text-amber-400" />, action: 'license' },
                              { label: 'PowerShell', icon: <TermIcon className="w-6 h-6 text-emerald-400" />, action: 'cmd' },
                              { label: 'Store', icon: <ShoppingBag className="w-6 h-6 text-pink-400" />, action: 'store' },
                              { label: 'Notepad', icon: <FileText className="w-6 h-6 text-amber-200" />, action: 'notepad' },
                              { label: 'Minecraft', icon: <Gamepad className="w-6 h-6 text-emerald-500" />, action: 'store' },
                              { label: 'Terminal', icon: <TermIcon className="w-6 h-6 text-slate-300" />, action: 'cmd' }
                            ].map((app, idx) => (
                              <div 
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setWin11ActiveApp(app.action); setWin11StartMenuOpen(false); }}
                                className="flex flex-col items-center gap-1 hover:bg-white/5 p-1 rounded transition-colors cursor-pointer"
                              >
                                {app.icon}
                                <span className="text-[9px] text-slate-300 truncate w-full">{app.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Profile Footer */}
                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center text-[10px]">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-500 text-white font-bold flex items-center justify-center text-[9px]">
                              {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div>
                              <div className="font-bold text-white text-[10px] leading-tight truncate max-w-[120px]">{user?.name || 'Ultra User'}</div>
                              <div className="text-[8px] text-amber-400 font-extrabold leading-none mt-0.5 uppercase tracking-widest flex items-center gap-0.5">
                                <Sparkles className="w-2 h-2 fill-amber-400 text-amber-400 animate-pulse" /> Lifetime Pro
                              </div>
                            </div>
                          </div>
                          
                          {/* Shut down button */}
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveWindowApp(null); }}
                            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Shut Down Virtual PC"
                          >
                            <Power className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Windows 11 Taskbar */}
                    <div className="h-12 bg-[#121212db] border-t border-slate-850 backdrop-blur-md flex items-center justify-between px-3 relative z-10 select-none">
                      {/* Left: widgets icon */}
                      <div className="w-16 flex items-center">
                        <div className="flex gap-[2px] w-3.5 h-3.5 opacity-60 hover:opacity-100 cursor-pointer">
                          <div className="bg-sky-400 rounded-[1px] w-1.5 h-1.5" />
                          <div className="bg-amber-400 rounded-[1px] w-1.5 h-1.5" />
                        </div>
                      </div>

                      {/* Center: Windows 11 Icons */}
                      <div className="flex items-center gap-2.5">
                        {/* Centered Start Button */}
                        <button 
                          onClick={(e) => { e.stopPropagation(); setWin11StartMenuOpen(!win11StartMenuOpen); }}
                          className={`p-1.5 rounded transition-all cursor-pointer flex items-center justify-center ${win11StartMenuOpen ? 'bg-white/10 scale-95' : 'hover:bg-white/5'}`}
                        >
                          <div className="grid grid-cols-2 gap-[1.5px] w-3.5 h-3.5">
                            <div className="bg-sky-500 rounded-[0.5px]" />
                            <div className="bg-sky-500 rounded-[0.5px]" />
                            <div className="bg-sky-500 rounded-[0.5px]" />
                            <div className="bg-sky-500 rounded-[0.5px]" />
                          </div>
                        </button>

                        {/* Search Box Trigger */}
                        <button 
                          onClick={(e) => { e.stopPropagation(); setWin11ActiveApp('edge'); setWin11StartMenuOpen(false); }}
                          className="hover:bg-white/5 p-1.5 rounded transition-colors cursor-pointer hidden sm:flex items-center gap-1.5 bg-black/30 border border-slate-800/40 w-24 text-left text-slate-400 text-[9.5px]"
                        >
                          <Search className="w-3 h-3 text-slate-500" />
                          <span>Search</span>
                        </button>

                        {/* App pins */}
                        {[
                          { id: 'edge', icon: <Globe className="w-4 h-4 text-cyan-300" /> },
                          { id: 'cmd', icon: <TermIcon className="w-4 h-4 text-slate-200" /> },
                          { id: 'store', icon: <ShoppingBag className="w-4 h-4 text-pink-400" /> },
                          { id: 'notepad', icon: <FileText className="w-4 h-4 text-amber-200" /> },
                          { id: 'settings', icon: <WinSettings className="w-4 h-4 text-sky-400" /> }
                        ].map(icon => {
                          const isActive = win11ActiveApp === icon.id;
                          return (
                            <button
                              key={icon.id}
                              onClick={(e) => { e.stopPropagation(); setWin11ActiveApp(isActive ? null : icon.id); setWin11StartMenuOpen(false); }}
                              className={`p-1.5 rounded transition-all cursor-pointer relative ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            >
                              {icon.icon}
                              {isActive && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-[2px] bg-sky-500 rounded-full" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Right: System Tray & Clock */}
                      <div className="flex items-center gap-2 text-slate-300 font-sans text-[9px] text-right w-24 justify-end select-none">
                        <div className="flex gap-1.5 items-center opacity-85 hover:opacity-100 cursor-pointer">
                          <Wifi className="w-3.5 h-3.5" />
                          <Volume2 className="w-3.5 h-3.5" />
                          <Battery className="w-3.5 h-3.5" />
                        </div>
                        <div className="border-l border-slate-800 h-6 mx-0.5" />
                        <div className="flex flex-col justify-center items-end leading-normal text-[8.5px] cursor-pointer hover:bg-white/5 p-1 rounded">
                          <span className="font-medium text-white">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="text-[7.5px] text-slate-400">{new Date().toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Desktop Mode (simulated Linux GNOME/Ubuntu) */}
                {activeWindowApp === 'desktop' && (
                  <div className="relative w-full h-[360px] select-none bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex flex-col font-sans text-white shadow-2xl overflow-hidden">
                    {/* Desktop Workspace */}
                    <div className="flex-1 relative p-4 flex flex-col flex-wrap gap-4 items-start content-start" onClick={() => setDesktopStartMenuOpen(false)}>
                      
                      {/* Desktop Icons */}
                      <div 
                        onClick={(e) => { e.stopPropagation(); setDesktopActiveApp('files'); setDesktopStartMenuOpen(false); }}
                        className="p-1.5 rounded hover:bg-white/10 transition-all flex flex-col items-center gap-1 text-center w-16 cursor-pointer"
                      >
                        <Folder className="w-8 h-8 text-yellow-400" />
                        <span className="text-[10px] tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-tight">File Manager</span>
                      </div>

                      <div 
                        onClick={(e) => { e.stopPropagation(); setDesktopActiveApp('browser'); setDesktopStartMenuOpen(false); }}
                        className="p-1.5 rounded hover:bg-white/10 transition-all flex flex-col items-center gap-1 text-center w-16 cursor-pointer"
                      >
                        <Globe className="w-8 h-8 text-emerald-400" />
                        <span className="text-[10px] tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-tight">Nova Web</span>
                      </div>

                      <div 
                        onClick={(e) => { e.stopPropagation(); setDesktopActiveApp('monitor'); setDesktopStartMenuOpen(false); }}
                        className="p-1.5 rounded hover:bg-white/10 transition-all flex flex-col items-center gap-1 text-center w-16 cursor-pointer"
                      >
                        <Activity className="w-8 h-8 text-cyan-400" />
                        <span className="text-[10px] tracking-wide text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-tight">Sys Monitor</span>
                      </div>

                      {/* Desktop App Window Overlay */}
                      {desktopActiveApp && (
                        <div 
                          className="absolute inset-x-4 top-4 bottom-4 bg-[#181824] border border-slate-700/80 rounded-xl shadow-2xl flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Window Header */}
                          <div className="bg-[#1e1e30] px-3 py-1.5 flex justify-between items-center text-[10px] font-bold border-b border-slate-800 rounded-t-xl select-none">
                            <div className="flex items-center gap-1.5 text-slate-200">
                              {desktopActiveApp === 'files' && <Folder className="w-3.5 h-3.5 text-yellow-400" />}
                              {desktopActiveApp === 'browser' && <Globe className="w-3.5 h-3.5 text-emerald-400" />}
                              {desktopActiveApp === 'monitor' && <Activity className="w-3.5 h-3.5 text-cyan-400" />}
                              <span className="uppercase tracking-wider">
                                {desktopActiveApp === 'files' && 'GNOME Files - Virtual FileSystem'}
                                {desktopActiveApp === 'browser' && 'Nova Web - AI Web Surf'}
                                {desktopActiveApp === 'monitor' && 'System Resource Telemetry'}
                              </span>
                            </div>
                            <button onClick={() => setDesktopActiveApp(null)} className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-650 transition-colors cursor-pointer flex items-center justify-center text-[8px] text-white">×</button>
                          </div>

                          {/* Window Body */}
                          <div className="flex-grow overflow-y-auto p-3 text-[11px] leading-normal text-slate-300">
                            {/* File Explorer */}
                            {desktopActiveApp === 'files' && (
                              <div className="flex flex-col h-full justify-between">
                                <div className="grid grid-cols-3 gap-2">
                                  {/* Left: file tree list */}
                                  <div className="col-span-1 border-r border-slate-800 pr-2 space-y-1">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Documents</span>
                                    {Object.keys(fileSystem).map(filename => (
                                      <button
                                        key={filename}
                                        onClick={() => setDesktopFileView(filename)}
                                        className={`w-full text-left p-1 text-[10px] rounded hover:bg-white/5 transition-colors flex items-center gap-1 cursor-pointer truncate ${
                                          desktopFileView === filename ? 'bg-indigo-500/20 text-white font-bold' : ''
                                        }`}
                                      >
                                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{filename}</span>
                                      </button>
                                    ))}
                                  </div>

                                  {/* Right: file contents preview or file adding form */}
                                  <div className="col-span-2 pl-2 flex flex-col justify-between h-[160px] overflow-y-auto">
                                    {desktopFileView ? (
                                      <div className="flex flex-col h-full justify-between gap-1">
                                        <div className="space-y-1.5">
                                          <div className="flex justify-between items-center text-[10px] border-b border-slate-800 pb-1">
                                            <span className="font-bold text-white">{desktopFileView}</span>
                                            <button 
                                              onClick={() => {
                                                const next = { ...fileSystem };
                                                delete next[desktopFileView];
                                                setFileSystem(next);
                                                setDesktopFileView(null);
                                              }}
                                              className="text-[9px] text-red-400 hover:text-red-350 flex items-center gap-0.5 cursor-pointer"
                                            >
                                              <Trash2 className="w-3 h-3" /> Delete
                                            </button>
                                          </div>
                                          <pre className="p-1.5 bg-black/40 rounded text-[9.5px] font-mono text-slate-200 whitespace-pre-wrap max-h-[100px] overflow-y-auto leading-normal">
                                            {fileSystem[desktopFileView]}
                                          </pre>
                                        </div>
                                        <button onClick={() => setDesktopFileView(null)} className="text-[9px] text-indigo-400 hover:underline">← Create new file</button>
                                      </div>
                                    ) : (
                                      <div className="space-y-2 flex flex-col h-full justify-between">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Write New File</span>
                                        <div className="space-y-1">
                                          <input 
                                            type="text"
                                            placeholder="filename.txt"
                                            value={desktopNewFileName}
                                            onChange={(e) => setDesktopNewFileName(e.target.value)}
                                            className="w-full bg-black border border-slate-800 rounded p-1 text-[10px] text-white focus:outline-none"
                                          />
                                          <textarea 
                                            placeholder="Enter file text here..."
                                            value={desktopNewFileContent}
                                            onChange={(e) => setDesktopNewFileContent(e.target.value)}
                                            className="w-full bg-black border border-slate-800 rounded p-1 text-[10px] text-white focus:outline-none h-14 resize-none"
                                          />
                                        </div>
                                        <button
                                          onClick={() => {
                                            const name = desktopNewFileName.trim();
                                            if (name) {
                                              setFileSystem(prev => ({ ...prev, [name]: desktopNewFileContent }));
                                              setDesktopNewFileName('');
                                              setDesktopNewFileContent('');
                                              setDesktopFileView(name);
                                            }
                                          }}
                                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold p-1 rounded text-[9.5px] cursor-pointer"
                                        >
                                          Save File
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Browser App */}
                            {desktopActiveApp === 'browser' && (
                              <div className="flex flex-col h-full justify-between">
                                <form 
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const q = desktopSearchQuery.trim();
                                    if (!q) return;
                                    setDesktopSearchLoading(true);
                                    setTimeout(() => {
                                      setDesktopSearchResults([
                                        `🌐 NovaSearch top index response for "${q}":`,
                                        `• Running in sandbox desktop mode connected securely to NovaOS host server.`,
                                        `• Live virtual kernel telemetry looks incredibly healthy!`,
                                        `• Tip: You can query Gemini directly in the console using "ask-ai <prompt>"`
                                      ]);
                                      setDesktopSearchLoading(false);
                                    }, 1000);
                                  }}
                                  className="flex gap-1.5 bg-black/40 border border-slate-800 rounded p-1"
                                >
                                  <input 
                                    type="text"
                                    value={desktopSearchQuery}
                                    onChange={(e) => setDesktopSearchQuery(e.target.value)}
                                    placeholder="Surf the simulated web via NovaSearch..."
                                    className="bg-transparent border-none text-white focus:outline-none flex-grow font-sans text-[10px] px-1.5"
                                  />
                                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-0.5 rounded text-[9px] cursor-pointer">Surf</button>
                                </form>

                                <div className="flex-grow mt-2 bg-black/50 border border-slate-800 rounded p-2 overflow-y-auto max-h-[140px] text-[10px]">
                                  {desktopSearchLoading ? (
                                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold animate-pulse py-4">
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Crawling decentralized web nodes...
                                    </div>
                                  ) : desktopSearchResults.length > 0 ? (
                                    <div className="space-y-1 text-slate-300 leading-normal">
                                      {desktopSearchResults.map((r, i) => (
                                        <div key={i} className={i === 0 ? "font-bold text-emerald-400" : ""}>{r}</div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-slate-500 italic text-center py-6">
                                      Decentralized privacy-first search engine ready. Enter any topic or keyword above.
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* System Monitor App */}
                            {desktopActiveApp === 'monitor' && (
                              <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="bg-slate-900/60 border border-slate-800 p-2 rounded-xl text-center">
                                    <span className="text-[9px] text-slate-500 uppercase block font-bold font-mono">CPU Usage</span>
                                    <span className="text-sm font-black font-mono text-cyan-400 mt-1 block">{cpuUsage}%</span>
                                    <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden mt-2">
                                      <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${cpuUsage}%` }} />
                                    </div>
                                  </div>
                                  <div className="bg-slate-900/60 border border-slate-800 p-2 rounded-xl text-center">
                                    <span className="text-[9px] text-slate-500 uppercase block font-bold font-mono">RAM Active</span>
                                    <span className="text-sm font-black font-mono text-emerald-400 mt-1 block">{ramUsage} GB</span>
                                    <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden mt-2">
                                      <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${(ramUsage/8)*100}%` }} />
                                    </div>
                                  </div>
                                  <div className="bg-slate-900/60 border border-slate-800 p-2 rounded-xl text-center">
                                    <span className="text-[9px] text-slate-500 uppercase block font-bold font-mono">Sim Uptime</span>
                                    <span className="text-[10px] font-bold font-mono text-yellow-400 mt-2 block truncate">{uptime}</span>
                                    <span className="text-[8px] text-slate-500 block mt-1">Status: Stable</span>
                                  </div>
                                </div>
                                <div className="p-2 bg-black/30 border border-slate-800/60 rounded-lg text-[9.5px] text-slate-400 leading-normal font-mono">
                                  System graphics acceleration linked. Hypervisor hyperthreading allocated safely under user: {user?.email || 'Guest root'}.
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* GNOME Start Menu / Applications list */}
                    {desktopStartMenuOpen && (
                      <div className="w-64 bg-slate-950/95 border border-slate-800 backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl flex flex-col justify-between absolute bottom-14 left-4 z-20 animate-in slide-in-from-bottom-4 fade-in duration-150">
                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase block border-b border-slate-800 pb-1">Desktop Utilities</span>
                          <div className="space-y-1.5">
                            {[
                              { label: 'File Manager', desc: 'Browse Virtual FS', icon: <Folder className="w-4 h-4 text-yellow-400" />, app: 'files' },
                              { label: 'Nova Web Browser', desc: 'Secure Web Explorer', icon: <Globe className="w-4 h-4 text-emerald-400" />, app: 'browser' },
                              { label: 'System Resource Monitor', desc: 'CPU & Memory Telemetry', icon: <Activity className="w-4 h-4 text-cyan-400" />, app: 'monitor' },
                              { label: 'Wireshark Protocol Analyzer', desc: 'Sniff and decode packet flows', icon: <Radio className="w-4 h-4 text-sky-400" />, app: 'wireshark_os' },
                              { label: 'Tor Onion Browser', desc: 'Browse deeply anonymized nodes', icon: <Shield className="w-4 h-4 text-purple-400" />, app: 'tor_os' }
                            ].map((item, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  if (item.app === 'wireshark_os') {
                                    const wrs = packages.find(p => p.id === 'wireshark');
                                    if (wrs?.isInstalled) {
                                      setActiveWindowApp('wireshark');
                                    } else {
                                      setTerminalLines(prev => [...prev, { type: 'error', text: 'Wireshark is not installed. Please find and install it in the Software Store.' }]);
                                      setActiveTab('store');
                                    }
                                  } else if (item.app === 'tor_os') {
                                    const torpkg = packages.find(p => p.id === 'tor');
                                    if (torpkg?.isInstalled) {
                                      setActiveWindowApp('tor');
                                    } else {
                                      setTerminalLines(prev => [...prev, { type: 'error', text: 'Tor Browser is not installed. Please find and install it in the Software Store.' }]);
                                      setActiveTab('store');
                                    }
                                  } else {
                                    setDesktopActiveApp(item.app);
                                  }
                                  setDesktopStartMenuOpen(false);
                                }}
                                className="w-full text-left p-1.5 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                {item.icon}
                                <div>
                                  <div className="font-bold text-[10px] text-white leading-tight">{item.label}</div>
                                  <div className="text-[8.5px] text-slate-500 leading-none mt-0.5">{item.desc}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-slate-800 flex justify-between items-center text-[9.5px]">
                          <span className="text-slate-400 font-mono">User: root@novaOS</span>
                          <button onClick={() => setActiveWindowApp(null)} className="text-red-400 hover:text-red-300 font-bold">Shut Down</button>
                        </div>
                      </div>
                    )}

                    {/* Bottom Dock */}
                    <div className="h-12 bg-slate-950/80 border-t border-slate-850/60 backdrop-blur-md flex items-center justify-between px-4 relative z-10 select-none">
                      {/* Left: GNOME Applications Switcher */}
                      <button 
                        onClick={() => setDesktopStartMenuOpen(!desktopStartMenuOpen)}
                        className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5 ${desktopStartMenuOpen ? 'bg-white/10' : ''}`}
                      >
                        <Layers className="w-4 h-4 text-indigo-400" />
                        <span className="text-[10px] font-bold text-slate-200">Applications</span>
                      </button>

                      {/* Center: Quick App Launch Dock */}
                      <div className="flex gap-2.5 bg-black/40 px-3 py-1 rounded-full border border-slate-800/50">
                        {[
                          { app: 'files', icon: <Folder className="w-4 h-4 text-yellow-400" />, title: 'Files' },
                          { app: 'browser', icon: <Globe className="w-4 h-4 text-emerald-400" />, title: 'Web' },
                          { app: 'monitor', icon: <Activity className="w-4 h-4 text-cyan-400" />, title: 'Monitor' }
                        ].map(d => {
                          const isActive = desktopActiveApp === d.app;
                          return (
                            <button
                              key={d.app}
                              onClick={() => setDesktopActiveApp(isActive ? null : d.app)}
                              className={`p-1.5 rounded-full transition-all relative cursor-pointer hover:bg-white/5`}
                              title={d.title}
                            >
                              {d.icon}
                              {isActive && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-[2px] bg-indigo-400 rounded-full" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Right: Date Time & Tray */}
                      <div className="flex gap-2 items-center text-[9px] text-slate-400 font-mono">
                        <div className="flex gap-1.5 items-center">
                          <Wifi className="w-3.5 h-3.5" />
                          <Volume2 className="w-3.5 h-3.5" />
                          <Battery className="w-3.5 h-3.5 text-emerald-500" />
                        </div>
                        <div className="border-l border-slate-800 h-5" />
                        <span className="text-white text-[9.5px] font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* iOS 26 Simulator (Apple interactive simulation) */}
                {activeWindowApp === 'ios26' && (
                  <div className="relative w-full h-[360px] select-none bg-slate-900 flex items-center justify-center font-sans shadow-2xl overflow-hidden p-2">
                    {/* iPhone device container */}
                    <div className="w-[195px] h-[340px] bg-black border-[3px] border-[#3a352a] rounded-[26px] relative flex flex-col justify-between overflow-hidden shadow-2xl">
                      
                      {/* Dynamic Island at the top */}
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-30 flex items-center justify-center border border-white/5 overflow-hidden">
                        <div className="flex gap-1 items-center px-2 w-full justify-between">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          <span className="text-[6.5px] text-white font-mono leading-none scale-[0.8] tracking-widest uppercase">iOS26</span>
                          <div className="w-1 h-1 rounded-full bg-slate-800" />
                        </div>
                      </div>

                      {/* Top status bar (below island or overlay) */}
                      <div className="h-6 px-4 pt-1.5 flex justify-between items-center text-[7.5px] font-bold z-20 text-white font-sans select-none">
                        <span>9:41 AM</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[6px] tracking-tight bg-white/20 px-0.5 rounded text-white font-mono scale-95 font-extrabold uppercase">10G</span>
                          <Wifi className="w-2 h-2" />
                          <Battery className="w-2.5 h-2 text-emerald-400" />
                        </div>
                      </div>

                      {/* Main Screen Workspace */}
                      <div className="flex-1 relative flex flex-col overflow-hidden">
                        {!iosUnlocked ? (
                          /* LOCK SCREEN DISPLAY */
                          <div 
                            onClick={() => setIosUnlocked(true)}
                            className="absolute inset-0 bg-gradient-to-t from-[#111124] via-[#241a3c] to-[#0a0014] flex flex-col justify-between p-4 text-center cursor-pointer animate-in fade-in duration-200"
                          >
                            <div className="pt-2 space-y-1">
                              <span className="text-[7px] text-indigo-400 font-extrabold uppercase tracking-widest">Holographic Space-Net</span>
                              <h3 className="text-xl font-black text-white leading-none">09:41</h3>
                              <p className="text-[7.5px] text-slate-400 font-medium mt-0.5">Monday, July 20, 2026</p>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                              {/* Glowing unlock orb */}
                              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                <Sparkles className="w-4 h-4 text-indigo-400" />
                              </div>
                              <span className="text-[8px] text-indigo-300 font-bold tracking-widest uppercase animate-pulse">Tap Screen to Unlock</span>
                            </div>
                          </div>
                        ) : (
                          /* UNLOCKED SCREEN ENGINE */
                          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-[#10101e] to-slate-900 flex flex-col justify-between p-3.5 z-10 animate-in zoom-in-95 duration-150">
                            {iosActiveApp ? (
                              /* Active App inside iPhone screen */
                              <div className="flex-grow flex flex-col justify-between h-full text-[9.5px]">
                                {/* App window header */}
                                <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-1.5 font-bold uppercase tracking-wide text-slate-400 scale-95 origin-left">
                                  <span>{iosActiveApp}</span>
                                  <button onClick={() => setIosActiveApp(null)} className="text-[8px] text-indigo-400 hover:text-white cursor-pointer font-bold">Home</button>
                                </div>

                                {/* App dynamic inner body */}
                                <div className="flex-1 overflow-y-auto pr-0.5 max-h-[200px]">
                                  {/* Siri App */}
                                  {iosActiveApp === 'siri' && (
                                    <div className="flex flex-col h-full justify-between">
                                      <div className="space-y-1.5 overflow-y-auto max-h-[140px] pr-0.5 scale-95 origin-top-left leading-tight">
                                        {iosSiriLines.map((line, idx) => {
                                          const isUser = line.startsWith('User:');
                                          return (
                                            <div 
                                              key={idx} 
                                              className={`p-1 rounded-lg ${
                                                isUser ? 'bg-indigo-600/30 text-indigo-200 ml-4 border-r-2 border-indigo-500' : 'bg-slate-800/40 text-slate-300 mr-4 border-l-2 border-emerald-500'
                                              }`}
                                            >
                                              {line}
                                            </div>
                                          );
                                        })}
                                        {iosSiriLoading && (
                                          <div className="text-slate-500 animate-pulse flex items-center gap-1 scale-[0.8]">
                                            <Loader2 className="w-3 h-3 animate-spin" /> Deep thinking...
                                          </div>
                                        )}
                                      </div>
                                      <form onSubmit={handleIosSiriSubmit} className="flex gap-1 border-t border-white/5 pt-1.5 mt-1.5 items-center">
                                        <input 
                                          type="text"
                                          value={iosSiriInput}
                                          onChange={(e) => setIosSiriInput(e.target.value)}
                                          placeholder="Ask Siri..."
                                          className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-[8.5px] focus:outline-none flex-1 text-white"
                                        />
                                        <button type="submit" className="bg-indigo-600 text-white rounded px-2 py-0.5 text-[8px] font-bold cursor-pointer">Send</button>
                                      </form>
                                    </div>
                                  )}

                                  {/* App Store App */}
                                  {iosActiveApp === 'appstore' && (
                                    <div className="space-y-1.5 scale-95 origin-top-left leading-tight">
                                      <span className="font-bold text-white text-[10px] block border-b border-white/5 pb-0.5">Quantum App Store</span>
                                      {[
                                        { name: 'HoloChess', desc: '3D holographic tabletop play', size: '42 MB' },
                                        { name: 'NeuralLink manager', desc: 'Control brainwave sync matrix', size: '12 MB' },
                                        { name: 'QuantumWallet', desc: 'Secure blockchain Sol coins', size: '8 MB' },
                                        { name: 'TeleportGo', desc: 'Simulated drone scheduling', size: '15 MB' }
                                      ].map((ap, i) => (
                                        <div key={i} className="p-1 rounded bg-white/5 border border-white/10 flex justify-between items-center text-[8.5px]">
                                          <div>
                                            <span className="font-bold text-slate-200">{ap.name}</span>
                                            <div className="text-[7.5px] text-slate-500 mt-0.5">{ap.desc}</div>
                                          </div>
                                          <span className="text-[8px] text-emerald-400 bg-emerald-500/10 px-1 rounded whitespace-nowrap">Loaded</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Settings App */}
                                  {iosActiveApp === 'settings' && (
                                    <div className="space-y-2 scale-95 origin-top-left leading-tight">
                                      <span className="font-bold text-white text-[10px] block border-b border-white/5 pb-0.5">System Hardware Settings</span>
                                      
                                      <div className="space-y-2 text-[8.5px]">
                                        <div className="flex justify-between items-center p-1 bg-white/5 rounded">
                                          <span className="text-slate-300">Holographic Projection</span>
                                          <button 
                                            onClick={() => setIosHoloProjector(!iosHoloProjector)}
                                            className={`px-1.5 py-0.5 rounded text-[8px] font-bold cursor-pointer ${
                                              iosHoloProjector ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                                            }`}
                                          >
                                            {iosHoloProjector ? 'ON' : 'OFF'}
                                          </button>
                                        </div>

                                        <div className="flex justify-between items-center p-1 bg-white/5 rounded">
                                          <span className="text-slate-300">Neural Sync Loop</span>
                                          <button 
                                            onClick={() => setIosNeuralSync(!iosNeuralSync)}
                                            className={`px-1.5 py-0.5 rounded text-[8px] font-bold cursor-pointer ${
                                              iosNeuralSync ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                                            }`}
                                          >
                                            {iosNeuralSync ? 'ON' : 'OFF'}
                                          </button>
                                        </div>

                                        <div className="flex justify-between items-center p-1 bg-white/5 rounded">
                                          <span className="text-slate-300">Space-Net 10G Link</span>
                                          <button 
                                            onClick={() => setIosSpaceNet(!iosSpaceNet)}
                                            className={`px-1.5 py-0.5 rounded text-[8px] font-bold cursor-pointer ${
                                              iosSpaceNet ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                                            }`}
                                          >
                                            {iosSpaceNet ? 'ON' : 'OFF'}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Photos App */}
                                  {iosActiveApp === 'photos' && (
                                    <div className="space-y-1.5 scale-95 origin-top-left leading-tight">
                                      <span className="font-bold text-white text-[10px] block border-b border-white/5 pb-0.5">Decentralized Art Gallery</span>
                                      <div className="grid grid-cols-2 gap-1.5">
                                        {[
                                          { title: 'NeoTokyo 2026', desc: 'Cyberpunk cityscape', color: 'from-purple-500 to-indigo-500' },
                                          { title: 'Quantum Core', desc: 'Atomic computing engine', color: 'from-pink-500 to-rose-500' },
                                          { title: 'Siri Consciousness', desc: 'Gemini visual motif', color: 'from-emerald-500 to-cyan-500' },
                                          { title: 'Solar Flare', desc: 'Stellar fusion backdrop', color: 'from-amber-500 to-orange-500' }
                                        ].map((p, i) => (
                                          <div key={i} className="rounded border border-white/10 overflow-hidden flex flex-col bg-white/5">
                                            <div className={`h-8 bg-gradient-to-tr ${p.color}`} />
                                            <div className="p-1 scale-90 origin-top-left text-[7.5px]">
                                              <div className="font-bold text-white leading-tight truncate">{p.title}</div>
                                              <div className="text-slate-500 truncate">{p.desc}</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              /* App icon grid */
                              <div className="grid grid-cols-4 gap-y-3 gap-x-1.5 py-2 select-none text-center justify-items-center">
                                {[
                                  { label: 'Siri 10.0', icon: <MessageCircle className="w-5 h-5 text-indigo-400" />, app: 'siri' },
                                  { label: 'App Store', icon: <ShoppingBag className="w-5 h-5 text-blue-400" />, app: 'appstore' },
                                  { label: 'Settings', icon: <WinSettings className="w-5 h-5 text-slate-300" />, app: 'settings' },
                                  { label: 'Photos', icon: <Layers className="w-5 h-5 text-rose-400" />, app: 'photos' },
                                  { label: 'Safari 26', icon: <Globe className="w-5 h-5 text-emerald-400" />, app: 'settings' },
                                  { label: 'Music', icon: <Radio className="w-5 h-5 text-pink-400" />, app: 'settings' },
                                  { label: 'Compass', icon: <Gamepad className="w-5 h-5 text-yellow-500" />, app: 'appstore' },
                                  { label: 'Terminal', icon: <TermIcon className="w-5 h-5 text-slate-400" />, app: 'siri' }
                                ].map((icon, idx) => (
                                  <button 
                                    key={idx}
                                    onClick={() => setIosActiveApp(icon.app)}
                                    className="flex flex-col items-center gap-0.5 hover:bg-white/5 p-1 rounded-xl transition-all cursor-pointer text-center w-10"
                                  >
                                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow">
                                      {icon.icon}
                                    </div>
                                    <span className="text-[7px] text-slate-300 font-medium truncate w-full">{icon.label}</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Home Indicator bar at the very bottom */}
                            <div className="flex flex-col items-center pt-1 select-none">
                              {/* Sleek bottom dock */}
                              {!iosActiveApp && (
                                <div className="w-full bg-slate-900/60 border border-white/5 backdrop-blur-md rounded-2xl flex justify-around p-1 mb-2">
                                  <Globe className="w-4 h-4 text-emerald-400 cursor-pointer" onClick={() => setIosActiveApp('settings')} />
                                  <MessageCircle className="w-4 h-4 text-indigo-400 cursor-pointer" onClick={() => setIosActiveApp('siri')} />
                                  <Layers className="w-4 h-4 text-rose-400 cursor-pointer" onClick={() => setIosActiveApp('photos')} />
                                </div>
                              )}
                              {/* Home swipe bar */}
                              <button 
                                onClick={() => {
                                  if (iosActiveApp) setIosActiveApp(null);
                                  else setIosUnlocked(false);
                                }}
                                className="w-14 h-[3px] bg-white rounded-full hover:bg-slate-300 transition-colors cursor-pointer"
                                title={iosActiveApp ? "Exit App" : "Lock Device"}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 1. Nano Text Editor */}
                {activeWindowApp === 'nano' && (
                  <div className="flex-grow flex flex-col space-y-2 font-mono text-xs">
                    <div className="text-slate-400">Editing: <span className="text-emerald-400 font-bold">{nanoFilename}</span></div>
                    <textarea
                      value={nanoContent}
                      onChange={(e) => setNanoContent(e.target.value)}
                      className="w-full bg-black/60 border border-slate-800 rounded p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200 h-28 font-mono text-xs"
                    />
                    <button
                      onClick={() => {
                        setFileSystem(prev => ({ ...prev, [nanoFilename]: nanoContent }));
                        setTerminalLines(prev => [...prev, { type: 'success', text: `Saved file: ${nanoFilename}` }]);
                        setActiveWindowApp(null);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-1.5 rounded-lg max-w-fit cursor-pointer flex items-center gap-1 text-xs transition-all active:scale-95"
                    >
                      <Save className="w-3.5 h-3.5" /> Save File
                    </button>
                  </div>
                )}

                {/* 2. Python interactive ide */}
                {activeWindowApp === 'python' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                    <div className="space-y-2 flex flex-col justify-between">
                      <textarea
                        value={pythonCode}
                        onChange={(e) => setPythonCode(e.target.value)}
                        className="w-full bg-black border border-slate-800 rounded p-2 focus:outline-none text-[#E6DB74] font-mono h-24"
                      />
                      <button
                        onClick={runPythonInGUI}
                        disabled={isPythonRunning}
                        className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-black p-1.5 rounded cursor-pointer transition-all active:scale-95 text-center"
                      >
                        {isPythonRunning ? 'Executing...' : 'Run Python 3'}
                      </button>
                    </div>
                    <div className="bg-black/90 p-2 border border-slate-800 rounded flex flex-col justify-between h-32">
                      <div className="text-[10px] text-slate-500 font-bold border-b border-slate-900 pb-1 uppercase">Standard output logs</div>
                      <div className="flex-1 overflow-y-auto space-y-1 pt-1.5 text-green-400 text-[11px]">
                        {pythonOutputs.map((line, i) => <div key={i} className="leading-tight">{line}</div>)}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Matrix Digital rain screensaver */}
                {activeWindowApp === 'matrix' && (
                  <div className="flex flex-col items-center">
                    <canvas ref={matrixCanvasRef} className="w-full h-44 rounded bg-black border border-slate-900" />
                    <span className="text-[10px] text-emerald-500 font-mono mt-2 animate-pulse font-semibold">CASCADING MATRIX ACTIVE</span>
                  </div>
                )}

                {/* 4. Snake retro game */}
                {activeWindowApp === 'snake' && (
                  <div className="flex flex-col items-center justify-center font-mono">
                    <div className="relative w-[320px] h-[240px] bg-slate-900 rounded border-2 border-slate-800 overflow-hidden shadow-xl">
                      {snake.map((segment, index) => (
                        <div
                          key={index}
                          className="absolute bg-green-500 rounded-sm"
                          style={{ width: '16px', height: '16px', left: `${segment.x * 16}px`, top: `${segment.y * 16}px` }}
                        />
                      ))}
                      <div
                        className="absolute bg-red-500 rounded-full animate-pulse"
                        style={{ width: '14px', height: '14px', left: `${food.x * 16 + 1}px`, top: `${food.y * 16 + 1}px` }}
                      />
                      {snakeGameOver && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-2 z-10 text-center">
                          <h4 className="text-red-500 font-black text-lg">GAME OVER</h4>
                          <p className="text-xs text-slate-400">Score: {snakeScore}</p>
                          <button onClick={resetSnakeGame} className="bg-green-500 hover:bg-green-400 text-black px-4 py-1 rounded text-xs font-bold cursor-pointer">Restart</button>
                        </div>
                      )}
                    </div>
                    {/* Visual indicators for keys */}
                    <div className="flex gap-2.5 items-center justify-between w-[320px] mt-2.5 text-xs text-slate-400">
                      <span>Score: <span className="font-bold text-white">{snakeScore}</span></span>
                      <span>Use arrow keys to navigate snake</span>
                    </div>
                  </div>
                )}

                {/* 5. htop process table */}
                {activeWindowApp === 'htop' && (
                  <div className="font-mono text-[11px] text-green-400 flex flex-col justify-between h-full gap-3">
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <div>Load Average: 0.35 | Active Processes: {htopProcesses.length}</div>
                      <div>System Uptime: {uptime}</div>
                    </div>
                    <div className="overflow-y-auto max-h-[140px] bg-black/50 border border-slate-900 rounded p-1.5">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-900 text-white">
                            <th className="p-1 px-2">PID</th>
                            <th className="p-1">USER</th>
                            <th className="p-1">CPU%</th>
                            <th className="p-1">Command</th>
                          </tr>
                        </thead>
                        <tbody>
                          {htopProcesses.map(proc => (
                            <tr
                              key={proc.pid}
                              onClick={() => setSelectedPid(proc.pid)}
                              className={`cursor-pointer hover:bg-slate-800 ${selectedPid === proc.pid ? 'bg-indigo-950 text-white font-bold' : ''}`}
                            >
                              <td className="p-1 px-2 font-bold text-yellow-500">{proc.pid}</td>
                              <td className="p-1 text-slate-300">{proc.user}</td>
                              <td className="p-1 text-green-300">{proc.cpu}%</td>
                              <td className="p-1 text-white">{proc.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-2 text-[10px]">
                      <button
                        onClick={() => {
                          if (selectedPid) {
                            setHtopProcesses(prev => prev.filter(p => p.pid !== selectedPid));
                            setTerminalLines(prev => [...prev, { type: 'success', text: `Terminated PID process: ${selectedPid}` }]);
                            setSelectedPid(null);
                          }
                        }}
                        disabled={!selectedPid}
                        className="px-3 py-1 bg-red-600 text-white font-bold rounded cursor-pointer disabled:opacity-50"
                      >
                        Kill Process
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. Docker virtualization sim */}
                {activeWindowApp === 'docker' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col h-full gap-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-white border-b border-slate-900 pb-1 uppercase flex justify-between">
                          <span>Containers list</span>
                          <span className="text-emerald-400">Daemon Active</span>
                        </div>
                        <div className="space-y-1.5 overflow-y-auto max-h-[110px]">
                          {dockerContainers.map(c => (
                            <div key={c.id} className="p-1.5 rounded bg-slate-900 border border-slate-850 flex justify-between items-center">
                              <div>
                                <span className="font-bold text-white">{c.name}</span>
                                <div className="text-[10px] text-slate-500">{c.image} | {c.ports}</div>
                              </div>
                              <button
                                onClick={() => {
                                  setDockerContainers(prev => prev.filter(dc => dc.id !== c.id));
                                  setDockerLogs(logs => [...logs, `[docker] container ${c.name} killed.`]);
                                }}
                                className="text-[9px] bg-red-950 text-red-400 p-0.5 px-1 rounded hover:bg-red-900"
                              >
                                Kill
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-black/50 border border-slate-900 space-y-2">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase">Run container image</span>
                        <div className="flex gap-1.5">
                          {['nginx:alpine', 'postgres:16-alpine', 'redis:latest'].map(img => (
                            <button
                              key={img}
                              onClick={() => triggerDockerCreate(img)}
                              className="bg-indigo-950 text-indigo-300 p-1 rounded text-[9px] hover:text-white"
                            >
                              Run {img.split(':')[0]}
                            </button>
                          ))}
                        </div>
                        <div className="bg-black/80 p-1.5 h-12 overflow-y-auto text-[9px] text-slate-500 space-y-0.5">
                          {dockerLogs.map((log, i) => <div key={i}>{log}</div>)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. Network scanner sim */}
                {activeWindowApp === 'network' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col gap-3">
                    <div className="flex gap-2 bg-slate-900 p-2 rounded items-center">
                      <span className="text-slate-400 text-[10px]">Target Subnet:</span>
                      <input
                        type="text"
                        value={netIpRange}
                        onChange={(e) => setNetIpRange(e.target.value)}
                        className="bg-black text-white p-1 rounded border border-slate-800 flex-1 px-2 focus:outline-none text-xs"
                      />
                      <button
                        onClick={triggerNetworkSweep}
                        disabled={netIsScanning}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-1 px-3 rounded cursor-pointer transition-all text-xs"
                      >
                        {netIsScanning ? 'Scanning...' : 'Ping Subnet'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-black p-2.5 rounded h-28 overflow-y-auto text-[9px] text-orange-400/80">
                        <div>[nmap] sweep initialized for target: {netIpRange}...</div>
                        {netIsScanning ? <div>Scanning ports 22, 80, 443, 3000...</div> : <div>Scan finished. Discovered nodes ready in table list.</div>}
                      </div>

                      <div className="bg-slate-900 p-2.5 rounded h-28 overflow-y-auto text-[10px]">
                        <span className="text-slate-500 font-bold uppercase block mb-1">Discovered Hosts:</span>
                        {netDiscoveredNodes.map((n, i) => (
                          <div key={i} className="p-1 rounded bg-black/40 mb-1 flex justify-between">
                            <span className="font-bold text-white">{n.host} ({n.ip})</span>
                            <span className="text-slate-500 font-mono text-[9px]">Ping: {n.ping}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. Nmap Simulator Panel */}
                {activeWindowApp === 'nmap' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col gap-4">
                    {/* Controls Row */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="md:col-span-4 flex flex-col gap-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Host / IP:</span>
                        <input
                          type="text"
                          value={nmapTarget}
                          onChange={(e) => setNmapTarget(e.target.value)}
                          className="bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs font-mono"
                          placeholder="e.g. scanme.nmap.org"
                        />
                      </div>

                      <div className="md:col-span-5 flex flex-col gap-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Scan Options:</span>
                        <div className="flex gap-1 flex-wrap">
                          {[
                            { value: 'sS', label: '-sS (SYN)' },
                            { value: 'sT', label: '-sT (Connect)' },
                            { value: 'sV', label: '-sV (Version)' },
                            { value: 'O', label: '-O (OS)' },
                            { value: 'sC', label: '-sC (Scripts)' }
                          ].map(opt => (
                            <button
                              key={opt.value}
                              onClick={() => setNmapScanType(opt.value as any)}
                              className={`px-1.5 py-0.5 rounded text-[10px] border font-bold transition-all cursor-pointer ${
                                nmapScanType === opt.value
                                  ? 'bg-orange-600/20 border-orange-500 text-orange-400'
                                  : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-3 flex items-end">
                        <button
                          onClick={triggerNmapSweep}
                          disabled={nmapIsScanning}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black py-1.5 rounded-lg cursor-pointer transition-all active:scale-95 text-center flex items-center justify-center gap-1.5"
                        >
                          {nmapIsScanning ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Scanning...
                            </>
                          ) : (
                            <>
                              <Network className="w-3.5 h-3.5" />
                              Execute Nmap
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Scanning Progress */}
                    {nmapIsScanning && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Progress sweep status...</span>
                          <span className="text-orange-400 font-bold">{nmapProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-indigo-500 h-full transition-all duration-200" style={{ width: `${nmapProgress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Left Side: Realtime CLI output console */}
                      <div className="lg:col-span-5 flex flex-col gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Console output (stdout)</span>
                        <div className="bg-black p-3 rounded-xl h-44 overflow-y-auto text-[9px] text-green-400/90 font-mono space-y-1 border border-slate-900">
                          {nmapLogs.map((log, i) => (
                            <div key={i} className="leading-tight">
                              <span className="text-slate-500 mr-1.5">[{i + 1}]</span>
                              {log}
                            </div>
                          ))}
                          {nmapLogs.length === 0 && <div className="text-slate-600 italic">No scanning active. Click "Execute Nmap" above or run command in CLI shell.</div>}
                        </div>
                      </div>

                      {/* Right Side: Visual results mapping */}
                      <div className="lg:col-span-7 flex flex-col gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Parsed Target Report</span>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 h-44 overflow-y-auto flex flex-col gap-2">
                          {nmapResults ? (
                            <div className="space-y-3">
                              {/* Host Summary */}
                              <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                                <div>
                                  <span className="font-bold text-white text-xs">{nmapResults.host}</span>
                                  <div className="text-[10px] text-slate-400 mt-0.5">IP Address: {nmapResults.ip}</div>
                                </div>
                                <div className="text-right text-[10px]">
                                  <span className="bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded font-bold uppercase">Status: {nmapResults.status}</span>
                                  <div className="text-slate-400 mt-1">Latency: {nmapResults.latency}</div>
                                </div>
                              </div>

                              {/* OS details if requested */}
                              {nmapResults.os && (
                                <div className="p-1.5 bg-orange-500/5 border border-orange-500/10 rounded text-[10px] flex justify-between">
                                  <span className="text-orange-400 font-bold">OS Fingerprint:</span>
                                  <span className="text-white">{nmapResults.os}</span>
                                </div>
                              )}

                              {/* Ports Table */}
                              <div className="space-y-1">
                                <div className="grid grid-cols-12 text-[9px] font-bold text-slate-500 uppercase border-b border-slate-900 pb-1">
                                  <span className="col-span-2">Port</span>
                                  <span className="col-span-2">State</span>
                                  <span className="col-span-2">Service</span>
                                  <span className="col-span-6">Version / Vulnerability Analysis</span>
                                </div>
                                <div className="space-y-1">
                                  {nmapResults.ports.map((p, idx) => (
                                    <div key={idx} className="flex flex-col border-b border-slate-850/50 pb-1.5">
                                      <div className="grid grid-cols-12 text-[10px] items-center">
                                        <span className="col-span-2 font-bold text-yellow-500 font-mono">{p.port}/tcp</span>
                                        <span className="col-span-2">
                                          <span className="bg-green-500/10 text-green-400 px-1 py-0.2 rounded text-[9px] font-bold">open</span>
                                        </span>
                                        <span className="col-span-2 text-indigo-300 font-bold">{p.service}</span>
                                        <span className="col-span-6 text-slate-300 font-mono text-[9px] truncate">{p.version}</span>
                                      </div>
                                      {p.vuln && (
                                        <div className="mt-1 ml-4 p-1 rounded bg-black/60 text-[8px] text-orange-400 border-l border-orange-500 leading-tight">
                                          {p.vuln}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center text-xs p-4">
                              <Network className="w-8 h-8 text-slate-700 mb-2 animate-pulse" />
                              <p>No active report available.</p>
                              <p className="text-[10px] text-slate-600 mt-1">Configure target and options above, then run scan.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8.5 Masscan Simulator Panel */}
                {activeWindowApp === 'masscan' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col gap-4">
                    {/* Controls Row */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="md:col-span-4 flex flex-col gap-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Range / Block:</span>
                        <input
                          type="text"
                          value={masscanTarget}
                          onChange={(e) => setMasscanTarget(e.target.value)}
                          className="bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-mono"
                          placeholder="e.g. 192.168.1.0/24"
                        />
                      </div>

                      <div className="md:col-span-3 flex flex-col gap-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Probing Ports:</span>
                        <input
                          type="text"
                          value={masscanPorts}
                          onChange={(e) => setMasscanPorts(e.target.value)}
                          className="bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-mono"
                          placeholder="e.g. 80,443,22"
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col gap-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rate (packets/sec):</span>
                        <select
                          value={masscanRate}
                          onChange={(e) => setMasscanRate(e.target.value)}
                          className="bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-mono"
                        >
                          <option value="1000">1,000 pps</option>
                          <option value="10000">10,000 pps</option>
                          <option value="100000">100,000 pps</option>
                          <option value="1000000">1,000,000 pps</option>
                        </select>
                      </div>

                      <div className="md:col-span-3 flex items-end">
                        <button
                          onClick={triggerMasscanSweep}
                          disabled={masscanIsScanning}
                          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-black py-1.5 rounded-lg cursor-pointer transition-all active:scale-95 text-center flex items-center justify-center gap-1.5"
                        >
                          {masscanIsScanning ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Sweeping Range...
                            </>
                          ) : (
                            <>
                              <Activity className="w-3.5 h-3.5" />
                              Execute Masscan
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Scanning Progress */}
                    {masscanIsScanning && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Masscan range sweep progress...</span>
                          <span className="text-indigo-400 font-bold">{masscanProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full transition-all duration-200" style={{ width: `${masscanProgress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Left Side: Realtime CLI output console */}
                      <div className="lg:col-span-6 flex flex-col gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Console output (stdout)</span>
                        <div className="bg-black p-3 rounded-xl h-44 overflow-y-auto text-[9px] text-emerald-400/95 font-mono space-y-1 border border-slate-900">
                          {masscanLogs.map((log, i) => (
                            <div key={i} className="leading-tight">
                              <span className="text-slate-500 mr-1.5">[{i + 1}]</span>
                              {log}
                            </div>
                          ))}
                          {masscanLogs.length === 0 && <div className="text-slate-600 italic">No scanning active. Click "Execute Masscan" above or run command in CLI shell.</div>}
                        </div>
                      </div>

                      {/* Right Side: Discovered Open Ports table */}
                      <div className="lg:col-span-6 flex flex-col gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Discovered Open Ports ({masscanResults.length})</span>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 h-44 overflow-y-auto">
                          {masscanResults.length > 0 ? (
                            <div className="space-y-1">
                              <div className="grid grid-cols-12 text-[9px] font-bold text-slate-500 uppercase border-b border-slate-950 pb-1 mb-1">
                                <span className="col-span-5">IP Address</span>
                                <span className="col-span-3">Port/Proto</span>
                                <span className="col-span-2">State</span>
                                <span className="col-span-2">Time</span>
                              </div>
                              <div className="space-y-1 font-mono text-[10px]">
                                {masscanResults.map((res, idx) => (
                                  <div key={idx} className="grid grid-cols-12 items-center py-1 border-b border-slate-850/40">
                                    <span className="col-span-5 text-slate-200 font-bold">{res.ip}</span>
                                    <span className="col-span-3 text-yellow-500 font-bold">{res.port}/tcp</span>
                                    <span className="col-span-2">
                                      <span className="bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded text-[8px] font-bold">open</span>
                                    </span>
                                    <span className="col-span-2 text-slate-500 text-[9px]">{res.timestamp}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center text-xs p-4">
                              <Activity className="w-8 h-8 text-slate-700 mb-2 animate-pulse" />
                              <p>No open ports discovered yet.</p>
                              <p className="text-[10px] text-slate-600 mt-1">Configure target and rate limits, then run scan.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. Metasploit Framework Simulator */}
                {activeWindowApp === 'metasploit' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col gap-4">
                    <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl border border-red-500/10">
                      <div className="flex items-center gap-2">
                        <Skull className="w-5 h-5 text-red-500 animate-pulse" />
                        <span className="font-bold text-red-400">msfconsole v6.4.1-dev</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {msfSessionActive ? (
                          <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                            Session Active
                          </span>
                        ) : (
                          <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full text-[9px] font-bold">No Active Sessions</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Left: Exploit Configurations */}
                      <div className="md:col-span-4 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Exploit Parameters</span>
                        
                        <div className="space-y-2.5">
                          <div>
                            <label className="text-[10px] text-slate-500 block mb-1">Target Host IP:</label>
                            <input
                              type="text"
                              value={msfTarget}
                              onChange={(e) => setMsfTarget(e.target.value)}
                              className="w-full bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:border-red-500/40 text-xs font-mono"
                              placeholder="192.168.1.12"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 block mb-1">Exploit Module:</label>
                            <select
                              value={msfExploit}
                              onChange={(e) => setMsfExploit(e.target.value)}
                              className="w-full bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:border-red-500/40 text-xs"
                            >
                              <option value="exploit/windows/smb/ms17_010_eternalblue">ms17_010_eternalblue (EternalBlue)</option>
                              <option value="exploit/multi/handler">exploit/multi/handler (Generic Listener)</option>
                              <option value="exploit/unix/ftp/vsftpd_234_backdoor">vsftpd_234_backdoor (FTP Backdoor)</option>
                              <option value="exploit/windows/smb/psexec">psexec (SMB credential execution)</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 block mb-1">Payload:</label>
                            <select
                              value={msfPayload}
                              onChange={(e) => setMsfPayload(e.target.value)}
                              className="w-full bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:border-red-500/40 text-xs"
                            >
                              <option value="windows/x64/meterpreter/reverse_tcp">windows/x64/meterpreter/reverse_tcp</option>
                              <option value="linux/x64/meterpreter/reverse_tcp">linux/x64/meterpreter/reverse_tcp</option>
                              <option value="windows/shell/reverse_tcp">windows/shell/reverse_tcp (raw shell)</option>
                            </select>
                          </div>

                          <button
                            onClick={triggerMetasploitExploit}
                            disabled={msfIsRunning || msfSessionActive}
                            className={`w-full p-2 rounded font-bold uppercase tracking-wider text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
                              msfSessionActive 
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                          >
                            {msfIsRunning ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Exploiting...
                              </>
                            ) : msfSessionActive ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                Session Connected
                              </>
                            ) : (
                              <>
                                <Skull className="w-3.5 h-3.5" />
                                Launch Exploit
                              </>
                            )}
                          </button>

                          {msfSessionActive && (
                            <button
                              onClick={() => {
                                setMsfSessionActive(false);
                                setMsfLogs([]);
                                setMsfCmdOutput(['meterpreter > type sysinfo for info, shell for system root prompt']);
                              }}
                              className="w-full p-1.5 bg-slate-950 text-slate-400 hover:text-white rounded border border-slate-800 text-[10px] uppercase font-bold"
                            >
                              Disconnect Session
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right: Output Logs & Interactive Console */}
                      <div className="md:col-span-8 flex flex-col gap-3">
                        {/* Msf status log output */}
                        <div className="bg-black p-3 rounded-xl h-28 overflow-y-auto text-[9px] text-red-400/90 border border-slate-900/50 space-y-1">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1 mb-1">Framework Logs</span>
                          {msfLogs.map((log, i) => <div key={i}>{log}</div>)}
                          {msfLogs.length === 0 && <div className="text-slate-600 italic">Configure target and press "Launch Exploit" to view penetration framework logs.</div>}
                        </div>

                        {/* Interactive Meterpreter console */}
                        <div className="flex-1 bg-[#090d14] border border-slate-800 rounded-xl p-3 flex flex-col h-56">
                          <div className="flex-1 overflow-y-auto text-[10px] space-y-1 font-mono text-cyan-400">
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1 mb-1">Meterpreter Shell Simulator</span>
                            {msfCmdOutput.map((out, i) => (
                              <div key={i} className="whitespace-pre-wrap leading-tight">
                                {out.startsWith('meterpreter >') ? (
                                  <span className="text-pink-500">{out}</span>
                                ) : out.includes('CRITICAL') || out.includes('FAILED') ? (
                                  <span className="text-red-400 font-bold">{out}</span>
                                ) : out.startsWith('[+]') || out.includes('cracked') ? (
                                  <span className="text-emerald-400 font-bold">{out}</span>
                                ) : (
                                  <span className="text-cyan-300">{out}</span>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Quick shortcuts if session active */}
                          {msfSessionActive && (
                            <div className="flex gap-1.5 py-1.5 border-t border-slate-900/80 mt-1.5 overflow-x-auto">
                              {[
                                { label: 'Sysinfo', cmd: 'sysinfo' },
                                { label: 'Dump SAM hashes', cmd: 'hashdump' },
                                { label: 'Open Shell', cmd: 'shell' },
                                { label: 'Help', cmd: 'help' }
                              ].map(sc => (
                                <button
                                  key={sc.label}
                                  onClick={() => {
                                    setMsfCmdInput(sc.cmd);
                                  }}
                                  className="bg-cyan-950 hover:bg-cyan-900 text-cyan-300 px-2 py-0.5 rounded text-[9px] font-bold border border-cyan-800/30 whitespace-nowrap"
                                >
                                  {sc.label}
                                </button>
                              ))}
                            </div>
                          )}

                          <form onSubmit={handleMeterpreterCommandSubmit} className="flex gap-2 border-t border-slate-900 pt-2 items-center">
                            <span className="text-pink-500 font-bold text-[10px]">meterpreter &gt;</span>
                            <input
                              type="text"
                              value={msfCmdInput}
                              onChange={(e) => setMsfCmdInput(e.target.value)}
                              disabled={!msfSessionActive}
                              className="bg-transparent border-none text-white text-[10px] focus:outline-none flex-1 font-mono"
                              placeholder={msfSessionActive ? "type command (e.g. sysinfo, hashdump, shell)..." : "Establish session first to input"}
                            />
                            <button
                              type="submit"
                              disabled={!msfSessionActive}
                              className="bg-cyan-900 text-cyan-100 p-0.5 px-2.5 rounded text-[9px] hover:bg-cyan-800"
                            >
                              Send
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. Hydra Online Brute Force Simulator */}
                {activeWindowApp === 'hydra' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col gap-4">
                    <div className="bg-slate-900 p-3 rounded-xl border border-indigo-500/10 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-indigo-400 animate-pulse" />
                        <span className="font-bold text-slate-100">Hydra parallelized logon cracker</span>
                      </div>
                      <span className="text-[10px] bg-slate-950 p-1 px-2.5 rounded border border-slate-800 text-indigo-400 font-bold uppercase">Targeting SSH / FTP / HTTP</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Left: Input controls */}
                      <div className="lg:col-span-5 bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Attack Configuration</span>

                        <div className="space-y-2.5">
                          <div>
                            <label className="text-[10px] text-slate-500 block mb-1">Target Host / IP:</label>
                            <input
                              type="text"
                              value={hydraTarget}
                              onChange={(e) => setHydraTarget(e.target.value)}
                              className="w-full bg-black text-white p-1.5 rounded border border-slate-800 text-xs font-mono"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-500 block mb-1">Protocol / Service:</label>
                              <select
                                value={hydraService}
                                onChange={(e) => setHydraService(e.target.value as any)}
                                className="w-full bg-black text-white p-1.5 rounded border border-slate-800 text-xs"
                              >
                                <option value="ssh">SSH (Port 22)</option>
                                <option value="ftp">FTP (Port 21)</option>
                                <option value="http">HTTP POST Form</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[10px] text-slate-500 block mb-1">Target User:</label>
                              <input
                                type="text"
                                value={hydraUser}
                                onChange={(e) => setHydraUser(e.target.value)}
                                className="w-full bg-black text-white p-1.5 rounded border border-slate-800 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 block mb-1">Wordlist Choice:</label>
                            <select
                              value={hydraWordlist}
                              onChange={(e) => setHydraWordlist(e.target.value as any)}
                              className="w-full bg-black text-white p-1.5 rounded border border-slate-800 text-xs"
                            >
                              <option value="rockyou">rockyou.txt (Security standard)</option>
                              <option value="common">common_passwords.txt</option>
                              <option value="simple">simple_brute_list</option>
                            </select>
                          </div>

                          <button
                            onClick={triggerHydraAttack}
                            disabled={hydraIsRunning}
                            className="w-full p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-950 text-white font-bold uppercase text-xs rounded tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {hydraIsRunning ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Cracking (threads active)...
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" />
                                Start Brute-force
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Right: Results & Progress output */}
                      <div className="lg:col-span-7 flex flex-col gap-3">
                        {hydraIsRunning && (
                          <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl space-y-1">
                            <div className="flex justify-between text-[10px] text-indigo-300">
                              <span>Password guessing coverage...</span>
                              <span className="font-bold">{hydraProgress}%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${hydraProgress}%` }} />
                            </div>
                          </div>
                        )}

                        {hydraCracked && (
                          <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                              <Unlock className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-[10px] text-emerald-400 font-bold uppercase">Credential Cracked Successfully!</div>
                              <div className="text-white font-mono mt-0.5">
                                host: <span className="text-yellow-400">{hydraTarget}</span> | username: <span className="text-yellow-400">{hydraUser}</span> | password: <span className="text-emerald-400 font-extrabold">{hydraCracked}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex-grow bg-black p-3 rounded-xl h-48 overflow-y-auto text-[9px] text-indigo-300/90 border border-slate-900 space-y-1 leading-tight">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1 mb-1">Brute-Force Stdout Logs</span>
                          {hydraLogs.map((log, i) => <div key={i}>{log}</div>)}
                          {hydraLogs.length === 0 && <div className="text-slate-600 italic">Logs are populated in real-time when the Hydra cracker starts. Try SSH or FTP.</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. John the Ripper Offline Cracker */}
                {activeWindowApp === 'john' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col gap-4">
                    <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/10 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-400 animate-pulse" />
                        <span className="font-bold text-slate-100">John the Ripper Hash Cracker</span>
                      </div>
                      <span className="text-[10px] bg-slate-950 p-1 px-2.5 rounded border border-slate-800 text-emerald-400 font-bold uppercase">Offline Password Auditor</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Left: Input hash */}
                      <div className="lg:col-span-5 bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-3 flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Cryptographic Hash Input</span>

                          <div>
                            <label className="text-[10px] text-slate-500 block mb-1">Enter hash (bcrypt, MD5, SHA):</label>
                            <textarea
                              value={johnHash}
                              onChange={(e) => setJohnHash(e.target.value)}
                              rows={3}
                              className="w-full bg-black text-white p-1.5 rounded border border-slate-800 text-[10px] font-mono focus:outline-none focus:border-emerald-500/40"
                              placeholder="Paste cryptographic password hash here..."
                            />
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] text-slate-500 block">Templates (Click to Load):</span>
                            <div className="space-y-1.5">
                              <button
                                onClick={() => setJohnHash('$6$saltsalt$fWbY7N3aU8d2s9P0m1K2...')}
                                className="w-full text-left bg-black/40 hover:bg-black p-1.5 rounded text-[9px] text-slate-400 hover:text-white border border-slate-800/40"
                              >
                                <span className="font-bold text-emerald-400">SHA512:</span> $6$saltsalt$fWbY7... (dragon123)
                              </button>
                              <button
                                onClick={() => setJohnHash('$2y$12$R9h/lS3vA0g2NlWbY7N3aU8d2s9P0m...')}
                                className="w-full text-left bg-black/40 hover:bg-black p-1.5 rounded text-[9px] text-slate-400 hover:text-white border border-slate-800/40"
                              >
                                <span className="font-bold text-emerald-400">Bcrypt:</span> $2y$12$R9h/lS3vA... (dragon123)
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={triggerJohnCrack}
                          disabled={johnIsRunning}
                          className="w-full mt-3 p-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-950 text-white font-bold uppercase text-xs rounded tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {johnIsRunning ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Cracking hash structures...
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              Launch John
                            </>
                          )}
                        </button>
                      </div>

                      {/* Right: Cracking feedback */}
                      <div className="lg:col-span-7 flex flex-col gap-3">
                        {johnIsRunning && (
                          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-1">
                            <div className="flex justify-between text-[10px] text-emerald-300">
                              <span>Dictionary scan progress...</span>
                              <span className="font-bold">{Math.round(johnProgress)}%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${johnProgress}%` }} />
                            </div>
                          </div>
                        )}

                        {johnCracked && (
                          <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                              <Unlock className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-[10px] text-emerald-400 font-bold uppercase">Hash cracked in 0.04 seconds!</div>
                              <div className="text-white font-mono mt-0.5">
                                cleartext password value: <span className="text-emerald-400 font-extrabold text-sm font-sans">"{johnCracked}"</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex-grow bg-black p-3 rounded-xl h-48 overflow-y-auto text-[9px] text-emerald-300/90 border border-slate-900 space-y-1 leading-tight">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1 mb-1">Cracker Stdout Output</span>
                          {johnLogs.map((log, i) => <div key={i}>{log}</div>)}
                          {johnLogs.length === 0 && <div className="text-slate-600 italic">Select a template or input your custom security hash on the left, then trigger John.</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 12. Wireshark Network Packet Capture */}
                {activeWindowApp === 'wireshark' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col gap-4">
                    {/* Header bar controls */}
                    <div className="bg-[#18202d] p-3 rounded-xl border border-[#303f56] flex flex-wrap gap-3 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio className="w-5 h-5 text-sky-400 animate-pulse" />
                        <span className="font-bold text-white text-sm">Wireshark Protocol Analyzer</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400">Interface:</span>
                          <select
                            value={wireInterface}
                            onChange={(e) => setWireInterface(e.target.value as any)}
                            disabled={wireIsCapturing}
                            className="bg-black text-white p-1 rounded border border-slate-800 text-[10px]"
                          >
                            <option value="eth0">eth0 (Ethernet)</option>
                            <option value="wlan0">wlan0 (Wireless)</option>
                            <option value="lo">lo (Loopback)</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400">Filter:</span>
                          <input
                            type="text"
                            value={wireFilter}
                            onChange={(e) => setWireFilter(e.target.value)}
                            placeholder="e.g. tcp, http, port 80"
                            className="bg-black text-white p-1 rounded border border-slate-800 text-[10px] px-2 w-24 focus:outline-none focus:border-sky-500/40"
                          />
                        </div>

                        <div className="flex gap-1.5">
                          {!wireIsCapturing ? (
                            <button
                              onClick={() => setWireIsCapturing(true)}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] p-1 px-3 rounded cursor-pointer transition-all uppercase"
                            >
                              Start Capture
                            </button>
                          ) : (
                            <button
                              onClick={() => setWireIsCapturing(false)}
                              className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-[10px] p-1 px-3 rounded cursor-pointer transition-all uppercase"
                            >
                              Stop Capture
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setWirePackets([]);
                              setWireSelectedPacket(null);
                            }}
                            className="bg-slate-900 border border-slate-800 hover:text-white text-slate-400 font-bold text-[10px] p-1 px-2 rounded cursor-pointer transition-all"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Packets Table */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                      {/* Left: Packet flow list */}
                      <div className="xl:col-span-8 flex flex-col gap-2.5">
                        <div className="flex justify-between items-center px-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Captured Packets ({wirePackets.length})</span>
                          {wireIsCapturing && (
                            <span className="text-[9px] text-red-400 flex items-center gap-1.5 font-bold animate-pulse">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              SNIFFING NETWORK STREAM
                            </span>
                          )}
                        </div>

                        <div className="bg-black rounded-xl overflow-hidden border border-slate-900 flex flex-col h-60">
                          {/* Table Headers */}
                          <div className="grid grid-cols-12 text-[9px] font-bold text-slate-500 bg-slate-950 p-2 border-b border-slate-900 uppercase">
                            <span className="col-span-1">No.</span>
                            <span className="col-span-1.5">Time</span>
                            <span className="col-span-2.5">Source</span>
                            <span className="col-span-2.5">Destination</span>
                            <span className="col-span-1.5">Protocol</span>
                            <span className="col-span-1">Len</span>
                            <span className="col-span-2">Info</span>
                          </div>

                          <div className="flex-1 overflow-y-auto divide-y divide-slate-900 text-[10px]">
                            {wirePackets
                              .filter(p => !wireFilter || p.protocol.toLowerCase().includes(wireFilter.toLowerCase()) || p.info.toLowerCase().includes(wireFilter.toLowerCase()))
                              .map((p, idx) => {
                                // Match colors to standard wireshark styles
                                const styles = {
                                  TCP: 'bg-indigo-950/25 text-indigo-300 hover:bg-indigo-900/30',
                                  HTTP: 'bg-emerald-950/25 text-emerald-300 hover:bg-emerald-900/30',
                                  UDP: 'bg-sky-950/25 text-sky-300 hover:bg-sky-900/30',
                                  DNS: 'bg-amber-950/25 text-amber-300 hover:bg-amber-900/30',
                                  ICMP: 'bg-zinc-950/25 text-zinc-300 hover:bg-zinc-900/30',
                                  TLS: 'bg-orange-950/25 text-orange-300 hover:bg-orange-900/30'
                                };
                                const bgStyle = styles[p.protocol] || '';
                                const isSelected = wireSelectedPacket?.id === p.id;

                                return (
                                  <div
                                    key={idx}
                                    onClick={() => setWireSelectedPacket(p)}
                                    className={`grid grid-cols-12 p-2 cursor-pointer transition-all duration-100 ${bgStyle} ${
                                      isSelected ? 'ring-1 ring-sky-500 bg-sky-900/30' : ''
                                    }`}
                                  >
                                    <span className="col-span-1 font-mono">{p.id}</span>
                                    <span className="col-span-1.5 font-mono text-slate-400">{p.time}</span>
                                    <span className="col-span-2.5 font-mono truncate">{p.source}</span>
                                    <span className="col-span-2.5 font-mono truncate">{p.destination}</span>
                                    <span className="col-span-1.5 font-bold uppercase">{p.protocol}</span>
                                    <span className="col-span-1 text-slate-400">{p.length}</span>
                                    <span className="col-span-2 text-slate-200 font-mono text-[9px] truncate">{p.info}</span>
                                  </div>
                                );
                              })}
                            {wirePackets.length === 0 && (
                              <div className="p-8 text-center text-slate-500 italic text-[11px]">
                                Packet Capture is blank. Press "Start Capture" to sniff live connections!
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Selected packet detailed hex dump inspector */}
                      <div className="xl:col-span-4 flex flex-col gap-2.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Packet Decoders (Hex & ASCII dump)</span>

                        <div className="bg-[#090d14] rounded-xl border border-slate-900 p-3 h-60 flex flex-col justify-between">
                          {wireSelectedPacket ? (
                            <div className="flex flex-col h-full justify-between">
                              <div className="space-y-2 text-[10px]">
                                <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400">
                                  <span>Frame {wireSelectedPacket.id} Detail Info</span>
                                  <span className="font-bold uppercase text-sky-400">{wireSelectedPacket.protocol}</span>
                                </div>
                                <div className="space-y-1 font-sans text-[10px]">
                                  <div>• <span className="font-semibold text-slate-300">IPv4 Header:</span> Src={wireSelectedPacket.source} Dst={wireSelectedPacket.destination}</div>
                                  <div>• <span className="font-semibold text-slate-300">Protocol Layer:</span> {wireSelectedPacket.protocol} Data segment payload ({wireSelectedPacket.length} bytes)</div>
                                  <div>• <span className="font-semibold text-slate-300">Decoded Text:</span> <span className="font-mono text-[9.5px] text-yellow-300">{wireSelectedPacket.info}</span></div>
                                </div>
                              </div>

                              <div className="mt-3">
                                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Binary Hex Dump Payload</span>
                                <pre className="bg-black p-2 rounded text-[8px] font-mono text-cyan-500 leading-tight border border-slate-950 overflow-x-auto select-all">
                                  {wireSelectedPacket.hex}
                                </pre>
                              </div>
                            </div>
                          ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-600 text-[11px] p-4">
                              <Eye className="w-7 h-7 text-slate-700 mb-1.5 animate-pulse" />
                              Select any captured packet on the left to review parsed bytes and structure.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tor Browser Simulator Panel */}
                {activeWindowApp === 'tor' && (
                  <div className="font-sans text-xs text-slate-300 flex flex-col gap-4 animate-in fade-in duration-300">
                    {/* Main Browser Window */}
                    <div className="bg-[#1e1428] rounded-xl border border-purple-500/20 overflow-hidden shadow-2xl flex flex-col">
                      {/* Browser Navigation Toolbar */}
                      <div className="bg-[#120b1a] px-3 py-2.5 flex items-center justify-between gap-3 border-b border-purple-500/15">
                        <div className="flex items-center gap-2">
                          {/* Onion Logo Badge */}
                          <div className="w-7 h-7 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                            <Shield className="w-4 h-4 fill-current text-purple-500 animate-pulse" />
                          </div>
                          <span className="font-bold text-white text-xs tracking-wide">Tor Browser</span>
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                            CONNECTED
                          </span>
                          {vpnConnected ? (
                            <span className="text-[9px] bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30 font-mono font-bold flex items-center gap-1 animate-pulse">
                              <Shield className="w-3 h-3 fill-blue-500/20 text-blue-400" />
                              <span>VPN SECURE CHAIN ON ({vpnServers.find(s => s.id === vpnLocation)?.flag})</span>
                            </span>
                          ) : (
                            <span className="text-[9px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 font-mono flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-amber-400" />
                              <span>DIRECT TOR (No VPN)</span>
                            </span>
                          )}
                        </div>

                        {/* Navigation Buttons and URL bar */}
                        <div className="flex-grow flex items-center gap-2 max-w-xl">
                          <button 
                            onClick={() => {
                              setTorUrl('https://torproject.onion');
                              setTorActiveLeak(null);
                            }}
                            className="p-1 rounded hover:bg-white/5 text-purple-400 cursor-pointer" 
                            title="Home"
                          >
                            <Globe className="w-4 h-4" />
                          </button>
                          
                          {/* URL Bar */}
                          <div className="flex-grow flex items-center bg-black/60 border border-purple-500/25 rounded-lg px-2.5 py-1 text-xs focus-within:border-purple-400/50">
                            <Lock className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0" />
                            <input
                              type="text"
                              value={torUrl}
                              onChange={(e) => setTorUrl(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setTorActiveLeak(null);
                                  // Trigger a mini load state for the browser URL change
                                  setTorIsConnecting(true);
                                  setTorConnectionProgress(30);
                                  setTimeout(() => {
                                    setTorConnectionProgress(70);
                                    setTimeout(() => {
                                      setTorIsConnecting(false);
                                      setTorConnectionProgress(100);
                                    }, 200);
                                  }, 300);
                                }
                              }}
                              className="w-full bg-transparent text-purple-100 placeholder-purple-400/50 outline-none text-[11px] font-mono"
                            />
                            <button 
                              onClick={() => {
                                setTorActiveLeak(null);
                                setTorIsConnecting(true);
                                setTorConnectionProgress(20);
                                setTimeout(() => {
                                  setTorConnectionProgress(80);
                                  setTimeout(() => {
                                    setTorIsConnecting(false);
                                    setTorConnectionProgress(100);
                                  }, 300);
                                }, 200);
                              }}
                              className="text-purple-400 hover:text-purple-300 ml-1.5 cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Security Level and Circuit Switcher Toggle */}
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <button
                              onClick={() => setShowTorSecurityPopup(!showTorSecurityPopup)}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-900/30 border border-purple-500/20 text-purple-300 hover:bg-purple-900/50 text-[10px] font-bold uppercase transition-all cursor-pointer"
                            >
                              <Shield className="w-3.5 h-3.5 text-purple-400" />
                              <span>Level: {torSecurityLevel}</span>
                            </button>

                            {showTorSecurityPopup && (
                              <div className="absolute right-0 mt-2 w-64 bg-[#1b1224] border border-purple-500/30 rounded-xl p-3 shadow-2xl z-50 text-xs text-slate-300 space-y-2.5">
                                <div className="flex justify-between items-center border-b border-purple-500/10 pb-1.5">
                                  <span className="font-bold text-white uppercase tracking-wider text-[10px]">Security Settings</span>
                                  <button onClick={() => setShowTorSecurityPopup(false)} className="text-slate-400 hover:text-white">×</button>
                                </div>
                                <div className="space-y-2">
                                  {[
                                    { id: 'standard', title: 'Standard', desc: 'All Tor Browser and website features are enabled.' },
                                    { id: 'safer', title: 'Safer', desc: 'Disables JavaScript on non-HTTPS sites; some fonts and math symbols are disabled.' },
                                    { id: 'safest', title: 'Safest', desc: 'JavaScript is disabled by default on all sites; some images, media, and scripts are disabled.' }
                                  ].map((lvl) => (
                                    <label 
                                      key={lvl.id}
                                      className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                                        torSecurityLevel === lvl.id ? 'bg-purple-500/10 border border-purple-500/30' : 'hover:bg-purple-900/20'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name="torSec"
                                        checked={torSecurityLevel === lvl.id}
                                        onChange={() => setTorSecurityLevel(lvl.id as any)}
                                        className="mt-0.5 accent-purple-500"
                                      />
                                      <div>
                                        <div className="font-bold text-purple-200 text-[11px]">{lvl.title}</div>
                                        <div className="text-[10px] text-slate-400 leading-tight">{lvl.desc}</div>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={requestNewCircuit}
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase transition-all cursor-pointer"
                            title="Generate a completely new random onion relay circuit"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>New Circuit</span>
                          </button>
                        </div>
                      </div>

                      {/* Browser Content Area: split into Sidebar (circuit info) & Viewport */}
                      <div className="grid grid-cols-12 min-h-[460px]">
                        {/* Sidebar: Active Circuit path */}
                        <div className="col-span-12 md:col-span-4 bg-[#120b1a]/40 border-r border-purple-500/10 p-3.5 space-y-4">
                          <div>
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-2.5">
                              Tor Circuit For This Site
                            </span>
                            
                            {/* Circuit nodes connection visualization */}
                            <div className="space-y-3 pl-2.5 border-l-2 border-purple-500/20 relative">
                              {/* Browser Node */}
                              <div className="relative">
                                <span className="absolute -left-[15px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-purple-500/15" />
                                <div className="text-[11px] font-semibold text-white">This Browser (Local Host)</div>
                                <div className="text-[10px] text-purple-400 font-mono">127.0.0.1 (Socks5 Proxy)</div>
                              </div>

                              {/* Tor Relays */}
                              {torCircuit.map((node, i) => (
                                <div key={i} className="relative">
                                  <span className={`absolute -left-[15px] top-1 w-2.5 h-2.5 rounded-full ring-4 ${
                                    i === 0 ? 'bg-indigo-400 ring-indigo-400/15' : 
                                    i === 1 ? 'bg-pink-400 ring-pink-400/15' : 'bg-emerald-400 ring-emerald-400/15'
                                  }`} />
                                  <div className="text-[11px] font-semibold text-purple-100 flex items-center gap-1.5">
                                    <span>{node.role}:</span>
                                    <span className="text-slate-300 font-normal">{node.name}</span>
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                                    <span>IP: {node.ip}</span>
                                    <span className="text-[9.5px] bg-slate-900/50 px-1 py-0.2 rounded text-slate-300 font-sans">{node.country}</span>
                                  </div>
                                </div>
                              ))}

                              {/* Destination Node */}
                              <div className="relative pt-1">
                                <span className="absolute -left-[15px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15 animate-ping" />
                                <span className="absolute -left-[15px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
                                <div className="text-[11px] font-semibold text-white">Onion Destination Node</div>
                                <div className="text-[10px] text-emerald-400 font-mono truncate">{torUrl}</div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-purple-950/20 border border-purple-500/15 rounded-xl p-3 space-y-1.5">
                            <div className="text-[10px] font-bold text-purple-300 uppercase flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Multi-Layer Onion Encryption</span>
                            </div>
                            <p className="text-[10px] text-slate-300 leading-normal">
                              Tor encrypts your communication three times as it passes through the entry guard, the middle relay, and the exit relay. Each relay peels off a single layer of encryption before passing the data along.
                            </p>
                          </div>

                          {/* Quick Launch onion directory */}
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                              Darknet Onion Bookmarks
                            </span>
                            <div className="space-y-1.5">
                              {[
                                { name: 'Axis Directory & Routing Map', url: 'https://axisindex5t7y.onion', desc: 'Darknet axis relays and routing visualization' },
                                { name: 'DuckDuckGo Private Mirror', url: 'https://duckgo3v67uf.onion', desc: 'Secure search mirror' },
                                { name: 'Tor Project Portal', url: 'https://torproject.onion', desc: 'Official documentation and checks' },
                                { name: 'Anonymous Chat Lobby', url: 'https://whisperwall66.onion', desc: 'Decentralized message board' },
                                { name: 'Cyber Intelligence Leak Hub', url: 'https://leakdb4u5t3x.onion', desc: 'Simulated intelligence database' }
                              ].map((bkm, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setTorActiveLeak(null);
                                    setTorUrl(bkm.url);
                                    setTorIsConnecting(true);
                                    setTorConnectionProgress(15);
                                    setTimeout(() => {
                                      setTorConnectionProgress(75);
                                      setTimeout(() => {
                                        setTorIsConnecting(false);
                                        setTorConnectionProgress(100);
                                      }, 200);
                                    }, 200);
                                  }}
                                  className="w-full text-left p-2 rounded-lg bg-[#271a34]/30 hover:bg-purple-950/40 border border-purple-500/5 hover:border-purple-500/20 transition-all cursor-pointer block"
                                >
                                  <div className="font-bold text-purple-200 text-[10px] truncate">{bkm.name}</div>
                                  <div className="text-[9.5px] font-mono text-purple-400/80 truncate">{bkm.url}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Viewport: Actual browser page representation */}
                        <div className="col-span-12 md:col-span-8 bg-[#150d1d] p-5 flex flex-col justify-between relative overflow-y-auto max-h-[500px]">
                          {torIsConnecting ? (
                            /* Connecting / Loading screen */
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 space-y-4">
                              <div className="relative">
                                <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-400 animate-spin" />
                                <Shield className="w-6 h-6 text-purple-400 absolute inset-0 m-auto animate-pulse" />
                              </div>
                              <div className="space-y-1">
                                <h3 className="font-bold text-white text-sm">Building Encrypted Gateway Connection...</h3>
                                <p className="text-xs text-purple-300 max-w-sm mx-auto">
                                  Negotiating 3-layer TLS key exchange consensus metrics on {torCircuit[0].name}...
                                </p>
                              </div>
                              <div className="w-60 bg-purple-950/40 h-2 rounded-full overflow-hidden border border-purple-500/10">
                                <div className="bg-purple-400 h-full transition-all duration-300" style={{ width: `${torConnectionProgress}%` }} />
                              </div>
                              <span className="text-[10px] font-mono text-purple-400">Status: Bootstrapped {torConnectionProgress}%</span>
                            </div>
                          ) : (
                            /* Loaded viewports depending on active Onion link */
                            <div className="flex-grow flex flex-col justify-between">
                              {/* Router Check for Axis Directory */}
                              {torUrl.includes('axisindex5t7y.onion') ? (
                                <div className="space-y-4 font-sans animate-in fade-in duration-300">
                                  {/* Header */}
                                  <div className="border-b border-purple-500/15 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                    <div>
                                      <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                                        <Network className="w-4 h-4 text-purple-400 animate-pulse" />
                                        <span>Axis Onion Directory & Coordinate Mapping</span>
                                      </h3>
                                      <p className="text-[11px] text-slate-400">
                                        Coordinate-based mapping of peer-to-peer dark web onion routers and decentralized gateway axes.
                                      </p>
                                    </div>
                                    <span className="text-[9px] bg-purple-500/10 border border-purple-500/30 text-purple-400 px-2 py-0.5 rounded font-mono font-bold tracking-wider">
                                      AXIS MAP VERSION 2.4.0
                                    </span>
                                  </div>

                                  {/* Coordinate Grid and Node Details */}
                                  <div className="grid grid-cols-12 gap-4">
                                    {/* Visual SVG Map (X & Y Axis) */}
                                    <div className="col-span-12 lg:col-span-7 bg-black/40 border border-purple-500/10 rounded-xl p-3 flex flex-col justify-between">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                                          <Activity className="w-3.5 h-3.5" />
                                          <span>Interactive Relay Coordinates</span>
                                        </span>
                                        <span className="text-[9px] text-slate-500 font-mono">X: Bandwidth | Y: Latency</span>
                                      </div>

                                      {/* Interactive Axis Coordinate Graph (SVG) */}
                                      <div className="relative w-full h-56 bg-[#0a0511] rounded-lg border border-purple-500/5 overflow-hidden">
                                        <svg className="w-full h-full p-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                                          {/* Grid lines */}
                                          <line x1="10" y1="10" x2="10" y2="90" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />
                                          <line x1="30" y1="10" x2="30" y2="90" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />
                                          <line x1="50" y1="10" x2="50" y2="90" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />
                                          <line x1="70" y1="10" x2="70" y2="90" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />
                                          <line x1="90" y1="10" x2="90" y2="90" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />
                                          
                                          <line x1="10" y1="10" x2="90" y2="10" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />
                                          <line x1="10" y1="30" x2="90" y2="30" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />
                                          <line x1="10" y1="50" x2="90" y2="50" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />
                                          <line x1="10" y1="70" x2="90" y2="70" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />
                                          <line x1="10" y1="90" x2="90" y2="90" stroke="#3b1d5a" strokeWidth="0.5" strokeDasharray="1,2" />

                                          {/* X and Y Axes lines */}
                                          <line x1="10" y1="90" x2="95" y2="90" stroke="#7e22ce" strokeWidth="1" />
                                          <line x1="10" y1="5" x2="10" y2="90" stroke="#7e22ce" strokeWidth="1" />

                                          {/* Axis arrows */}
                                          <path d="M 95 88 L 98 90 L 95 92 Z" fill="#7e22ce" />
                                          <path d="M 8 5 L 10 2 L 12 5 Z" fill="#7e22ce" />

                                          {/* Active Tunnel Path Dotted Lines connecting current torCircuit */}
                                          {(() => {
                                            const node1 = axisNodes.find(n => n.name === torCircuit[0]?.name);
                                            const node2 = axisNodes.find(n => n.name === torCircuit[1]?.name);
                                            const node3 = axisNodes.find(n => n.name === torCircuit[2]?.name);
                                            if (node1 && node2 && node3) {
                                              return (
                                                <>
                                                  <line x1={node1.x} y1={node1.y} x2={node2.x} y2={node2.y} stroke="#f472b6" strokeWidth="1" strokeDasharray="1.5,1.5" className="animate-pulse" />
                                                  <line x1={node2.x} y1={node2.y} x2={node3.x} y2={node3.y} stroke="#34d399" strokeWidth="1" strokeDasharray="1.5,1.5" className="animate-pulse" />
                                                </>
                                              );
                                            }
                                            return null;
                                          })()}

                                          {/* Plot nodes as circles */}
                                          {axisNodes.map((node) => {
                                            const isActiveCircuit = torCircuit.some(c => c.name === node.name);
                                            const isSelected = selectedAxisNode?.id === node.id;
                                            const colorClass = 
                                              node.role.includes('Guard') ? '#a78bfa' : // purple
                                              node.role.includes('Middle') ? '#f472b6' : // pink
                                              '#34d399'; // exit emerald

                                            return (
                                              <g key={node.id} className="cursor-pointer" onClick={() => setSelectedAxisNode(node)}>
                                                {/* Outer highlight circle if active in circuit or selected */}
                                                {(isActiveCircuit || isSelected) && (
                                                  <circle
                                                    cx={node.x}
                                                    cy={node.y}
                                                    r={isSelected ? 3.5 : 2.5}
                                                    fill="none"
                                                    stroke={isSelected ? '#d8b4fe' : colorClass}
                                                    strokeWidth="0.5"
                                                    className={isActiveCircuit ? "animate-ping" : ""}
                                                    style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: isActiveCircuit ? '2s' : '0s' }}
                                                  />
                                                )}
                                                {/* Inner node dot */}
                                                <circle
                                                  cx={node.x}
                                                  cy={node.y}
                                                  r={isSelected ? 2 : 1.2}
                                                  fill={colorClass}
                                                  className="hover:scale-150 transition-all"
                                                />
                                              </g>
                                            );
                                          })}
                                        </svg>
                                        <div className="absolute left-12 bottom-1 text-[8px] text-purple-400 font-mono">Axis X: Bandwidth capacity &rarr;</div>
                                        <div className="absolute left-1 top-6 text-[8px] text-purple-400 font-mono origin-top-left rotate-90">Axis Y: Latency entropy &rarr;</div>
                                      </div>

                                      {/* Color legend */}
                                      <div className="flex gap-4 justify-center text-[9px] mt-2 border-t border-purple-500/5 pt-1.5 font-mono">
                                        <div className="flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full bg-purple-400" />
                                          <span className="text-purple-300">Guard Relays</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full bg-pink-400" />
                                          <span className="text-pink-300">Middle Relays</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                          <span className="text-emerald-300">Exit Relays</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right: Selected Node Details & Override controls */}
                                    <div className="col-span-12 lg:col-span-5 bg-black/40 border border-purple-500/10 rounded-xl p-3 flex flex-col justify-between">
                                      <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest block mb-2">
                                        Relay Axis Node Inspector
                                      </span>

                                      {selectedAxisNode ? (
                                        <div className="space-y-3 flex-grow flex flex-col justify-between">
                                          <div className="bg-[#1b1227]/60 border border-purple-500/15 rounded-lg p-2.5 space-y-1.5">
                                            <div className="flex justify-between items-center">
                                              <span className="text-[11px] font-extrabold text-white">{selectedAxisNode.name}</span>
                                              <span className="text-[9px] bg-purple-950 px-1.5 py-0.2 rounded text-slate-300 font-mono uppercase">
                                                {selectedAxisNode.role}
                                              </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
                                              <div>IP: <span className="text-purple-300">{selectedAxisNode.ip}</span></div>
                                              <div>Loc: <span className="text-purple-300">{selectedAxisNode.country}</span></div>
                                              <div>Bandwidth: <span className="text-amber-400">{selectedAxisNode.bandwidth} Mbps</span></div>
                                              <div>Latency: <span className="text-emerald-400">{selectedAxisNode.latency} ms</span></div>
                                              <div>Entropy keys: <span className="text-pink-400">{selectedAxisNode.entropy} bit</span></div>
                                              <div>Relay Uptime: <span className="text-cyan-400">99.98%</span></div>
                                            </div>
                                          </div>

                                          {/* Override actions */}
                                          <div className="space-y-1.5">
                                            <span className="text-[8.5px] font-bold text-purple-400 uppercase tracking-widest block">Force Circuit Injection:</span>
                                            {selectedAxisNode.role.includes('Guard') ? (
                                              <button
                                                onClick={() => {
                                                  const newTimestamp = new Date().toLocaleTimeString();
                                                  setTorCircuit(prev => [
                                                    { name: selectedAxisNode.name, ip: selectedAxisNode.ip, country: selectedAxisNode.country, role: 'Guard Relay' },
                                                    prev[1],
                                                    prev[2]
                                                  ]);
                                                  setTorLogs(prev => [
                                                    ...prev,
                                                    `[${newTimestamp}] [notice] User forced override of Guard axis. Connecting to ${selectedAxisNode.name}...`,
                                                    `[${newTimestamp}] [notice] Successfully pinned Guard relay coordinate to ${selectedAxisNode.ip}`
                                                  ]);
                                                }}
                                                className="w-full py-1.5 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 text-purple-200 hover:text-white font-bold rounded text-[10px] transition-all cursor-pointer"
                                              >
                                                Override Active Guard Relay
                                              </button>
                                            ) : selectedAxisNode.role.includes('Middle') ? (
                                              <button
                                                onClick={() => {
                                                  const newTimestamp = new Date().toLocaleTimeString();
                                                  setTorCircuit(prev => [
                                                    prev[0],
                                                    { name: selectedAxisNode.name, ip: selectedAxisNode.ip, country: selectedAxisNode.country, role: 'Middle Relay' },
                                                    prev[2]
                                                  ]);
                                                  setTorLogs(prev => [
                                                    ...prev,
                                                    `[${newTimestamp}] [notice] User forced override of Middle axis. Routing to ${selectedAxisNode.name}...`,
                                                    `[${newTimestamp}] [notice] Successfully pinned Middle relay coordinate to ${selectedAxisNode.ip}`
                                                  ]);
                                                }}
                                                className="w-full py-1.5 bg-pink-600/30 hover:bg-pink-600/50 border border-pink-500/30 text-pink-200 hover:text-white font-bold rounded text-[10px] transition-all cursor-pointer"
                                              >
                                                Override Active Middle Relay
                                              </button>
                                            ) : (
                                              <button
                                                onClick={() => {
                                                  const newTimestamp = new Date().toLocaleTimeString();
                                                  setTorCircuit(prev => [
                                                    prev[0],
                                                    prev[1],
                                                    { name: selectedAxisNode.name, ip: selectedAxisNode.ip, country: selectedAxisNode.country, role: 'Exit Relay' }
                                                  ]);
                                                  setTorLogs(prev => [
                                                    ...prev,
                                                    `[${newTimestamp}] [notice] User forced override of Exit axis. Tunneling through ${selectedAxisNode.name}...`,
                                                    `[${newTimestamp}] [notice] Successfully pinned Exit relay coordinate to ${selectedAxisNode.ip}`
                                                  ]);
                                                }}
                                                className="w-full py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/30 text-emerald-200 hover:text-white font-bold rounded text-[10px] transition-all cursor-pointer"
                                              >
                                                Override Active Exit Relay
                                              </button>
                                            )}
                                            <p className="text-[9px] text-slate-400 italic text-center leading-tight">
                                              Injected nodes are instantly mapped to the browser circuit path.
                                            </p>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex-grow flex flex-col items-center justify-center text-center p-4 border border-dashed border-purple-500/10 rounded-lg">
                                          <Globe className="w-7 h-7 text-purple-500/40 mb-1 animate-pulse" />
                                          <p className="text-[10px] text-slate-400">
                                            No node selected. Click any colored coordinate point on the Axis Map to override current relays.
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Diagnostics Section */}
                                  <div className="bg-black/40 border border-purple-500/10 rounded-xl p-3 space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                                        <Lock className="w-3.5 h-3.5 text-pink-400" />
                                        <span>Axis Diagnostics Audit Tool</span>
                                      </span>
                                      
                                      <button
                                        onClick={() => {
                                          setAxisDiagnosticActive(true);
                                          setAxisDiagnosticProgress(0);
                                          setAxisDiagnosticLogs([]);
                                          
                                          const logs = [
                                            '[INFO] Initiating security traceroute audits along X & Y coordinate axes...',
                                            `[GUARD] Probing guard relay "${torCircuit[0]?.name || 'default'}" at IP ${torCircuit[0]?.ip || 'default'}`,
                                            `[SEC] Checking TLS encapsulation layers (Entropy: ${axisNodes.find(n => n.name === torCircuit[0]?.name)?.entropy || 256} bits)`,
                                            `[MIDDLE] Handshake accepted by middle relay "${torCircuit[1]?.name || 'default'}"`,
                                            `[EXIT] Verifying isolated SOCKS5 socks-tunnel with exit node "${torCircuit[2]?.name || 'default'}"`,
                                            '[SUCCESS] Diagnostic check completed. 0 packets leaked. Cryptographic encapsulation integrity = 100%.'
                                          ];

                                          let prog = 0;
                                          const interval = setInterval(() => {
                                            prog += 20;
                                            setAxisDiagnosticProgress(prog);
                                            const logIndex = Math.floor(prog / 20) - 1;
                                            if (logs[logIndex]) {
                                              setAxisDiagnosticLogs(prev => [...prev, logs[logIndex]]);
                                            }
                                            if (prog >= 100) {
                                              clearInterval(interval);
                                            }
                                          }, 400);
                                        }}
                                        disabled={axisDiagnosticActive && axisDiagnosticProgress < 100}
                                        className="px-3 py-1 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900/30 text-white disabled:text-slate-500 font-bold rounded text-[10px] transition-all cursor-pointer"
                                      >
                                        {axisDiagnosticActive && axisDiagnosticProgress < 100 ? 'Running Diagnostics...' : 'Run Diagnostics Audit'}
                                      </button>
                                    </div>

                                    {axisDiagnosticActive && (
                                      <div className="space-y-2 animate-in fade-in duration-200">
                                        <div className="w-full bg-purple-950/40 h-1.5 rounded-full overflow-hidden border border-purple-500/10">
                                          <div className="bg-purple-400 h-full transition-all duration-300" style={{ width: `${axisDiagnosticProgress}%` }} />
                                        </div>
                                        <div className="h-20 bg-[#090510] border border-purple-500/5 rounded-lg p-2 overflow-y-auto text-[9px] font-mono text-emerald-400/90 space-y-0.5 select-text">
                                          {axisDiagnosticLogs.map((log, idx) => (
                                            <div key={idx}>{log}</div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Onion Service Search Directory */}
                                  <div className="bg-black/40 border border-purple-500/10 rounded-xl p-3 space-y-2">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                                        <Search className="w-3.5 h-3.5 text-purple-400" />
                                        <span>Axis Onion Link Indexes</span>
                                      </span>
                                      <input
                                        type="text"
                                        placeholder="Filter onion links..."
                                        value={axisSearch}
                                        onChange={(e) => setAxisSearch(e.target.value)}
                                        className="bg-[#20152c] border border-purple-500/20 rounded px-2 py-0.5 text-[9.5px] text-white placeholder-purple-400/50 outline-none w-40"
                                      />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {[
                                        { name: 'DuckDuckGo Private Mirror', url: 'https://duckgo3v67uf.onion', category: 'Search Engine', desc: 'Secure privacy index search' },
                                        { name: 'Whisper Wall Bulletin Board', url: 'https://whisperwall66.onion', category: 'Social Forum', desc: 'Decentralized onion chat boards' },
                                        { name: 'Simulated Intelligence Leak Base', url: 'https://leakdb4u5t3x.onion', category: 'Intelligence Hub', desc: 'Security audit vulnerabilities log database' },
                                        { name: 'Tor Project Gateway', url: 'https://torproject.onion', category: 'Project Hub', desc: 'Official documentation and router checks' }
                                      ]
                                      .filter(item => item.name.toLowerCase().includes(axisSearch.toLowerCase()) || item.url.toLowerCase().includes(axisSearch.toLowerCase()))
                                      .map((site, i) => (
                                        <button
                                          key={i}
                                          onClick={() => {
                                            setTorUrl(site.url);
                                            setTorActiveLeak(null);
                                            setTorIsConnecting(true);
                                            setTimeout(() => setTorIsConnecting(false), 300);
                                          }}
                                          className="text-left p-2 rounded-lg bg-[#1a1024]/40 hover:bg-purple-950/40 border border-purple-500/10 hover:border-purple-500/20 transition-all cursor-pointer flex flex-col justify-between"
                                        >
                                          <div className="flex justify-between items-center">
                                            <span className="font-bold text-purple-200 text-[10px]">{site.name}</span>
                                            <span className="text-[8px] bg-purple-950/60 text-purple-400 px-1 py-0.2 rounded font-sans">{site.category}</span>
                                          </div>
                                          <span className="text-[9px] font-mono text-slate-400 truncate mt-0.5">{site.url}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ) : torUrl.includes('duckgo3v67uf.onion') ? (
                                <div className="space-y-4">
                                  <div className="flex flex-col items-center text-center py-6 space-y-2">
                                    <div className="text-5xl font-extrabold flex items-center justify-center gap-2">
                                      <span className="text-amber-500">🦆</span>
                                      <span className="text-white text-2xl font-serif">DuckDuckGo</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-mono bg-black/40 px-2 py-0.5 rounded border border-purple-500/10">
                                      ONION SEARCH GATEWAY
                                    </span>
                                  </div>

                                  {/* DuckSearch box */}
                                  <div className="max-w-md mx-auto flex items-center gap-2">
                                    <div className="flex-grow flex items-center bg-[#251833] border border-purple-500/30 rounded-xl px-3 py-2 text-xs focus-within:border-purple-400">
                                      <Search className="w-4 h-4 text-purple-400 mr-2 shrink-0" />
                                      <input
                                        type="text"
                                        placeholder="Search anonymous darknet index registries..."
                                        value={torDdgQuery}
                                        onChange={(e) => setTorDdgQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            // Simulated query execution
                                            setTorIsConnecting(true);
                                            setTimeout(() => setTorIsConnecting(false), 400);
                                          }
                                        }}
                                        className="w-full bg-transparent text-white outline-none placeholder-purple-400/50"
                                      />
                                    </div>
                                    <button 
                                      onClick={() => {
                                        setTorIsConnecting(true);
                                        setTimeout(() => setTorIsConnecting(false), 400);
                                      }}
                                      className="px-3.5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all cursor-pointer"
                                    >
                                      Search
                                    </button>
                                  </div>

                                  {/* Results listing */}
                                  {torDdgQuery ? (
                                    <div className="space-y-3 mt-4 text-xs">
                                      <div className="text-[10px] text-slate-400 font-mono">Found 3 results matching "{torDdgQuery}"</div>
                                      {[
                                        { title: 'The Secure Drop Leakbox - leakbox-upload.onion', url: 'https://leakbox-upload.onion', desc: 'Secure platform for anonymous whistleblowers to upload data leak archives to cryptographic journalist collectives.' },
                                        { title: 'Tor-Lobby Encrypted IRC Chatroom', url: 'https://whisperwall66.onion', desc: 'Simulated decentralized message board. Meet other cybersecurity specialists, pen-testers, and darknet enthusiasts.' },
                                        { title: 'Kali Cyber Arsenal Git Mirror', url: 'https://gitkali-arsenal.onion', desc: 'Decentralized source control holding open-source network auditing proof of concept payloads and security patches.' }
                                      ].map((res, i) => (
                                        <div key={i} className="p-3 bg-[#241731]/40 rounded-xl border border-purple-500/10 space-y-1">
                                          <button
                                            onClick={() => {
                                              setTorUrl(res.url);
                                              setTorIsConnecting(true);
                                              setTimeout(() => setTorIsConnecting(false), 300);
                                            }}
                                            className="font-bold text-purple-300 hover:underline hover:text-purple-200 text-left block"
                                          >
                                            {res.title}
                                          </button>
                                          <div className="text-[9.5px] font-mono text-emerald-400">{res.url}</div>
                                          <p className="text-[10.5px] text-slate-300">{res.desc}</p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-center text-slate-500 py-4 italic">
                                      Enter any keyword query above to crawl peer-to-peer hidden service links.
                                    </div>
                                  )}
                                </div>
                              ) : torUrl.includes('whisperwall66.onion') ? (
                                /* Anonymous Whisper Wall with Surface, Deep & Dark Web layers */
                                <div className="space-y-4 animate-in fade-in duration-300">
                                  {/* Header */}
                                  <div className="border-b border-purple-500/15 pb-2.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                    <div>
                                      <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                                        <MessageCircle className="w-4 h-4 text-pink-400" />
                                        <span>Whisper Wall Decentrally Audited Bulletin Board</span>
                                      </h3>
                                      <p className="text-[11px] text-slate-400">
                                        An anonymous message repository exploring deep, dark, and surface net structures. No credentials required.
                                      </p>
                                    </div>
                                    <span className="text-[9px] bg-pink-500/10 border border-pink-500/30 text-pink-400 px-2 py-0.5 rounded font-mono font-bold">
                                      PROTOCOL: WSS-TOR-V3
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-12 gap-4">
                                    {/* Left Column: Interactive Web Iceberg Explorer */}
                                    <div className="col-span-12 xl:col-span-5 bg-black/40 border border-purple-500/10 rounded-xl p-3 flex flex-col justify-between space-y-3">
                                      <div>
                                        <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                                          <Layers className="w-3.5 h-3.5 text-purple-400" />
                                          <span>Internet Iceberg Levels</span>
                                        </span>
                                        <p className="text-[10.5px] text-slate-300 mb-3 leading-relaxed">
                                          The internet is structured into three layers with radically distinct indexing, protocols, and accessibility footprints:
                                        </p>

                                        {/* Vertical Iceberg Visual Selector */}
                                        <div className="space-y-2">
                                          {[
                                            {
                                              key: 'surface',
                                              title: 'Surface Web',
                                              percentage: '4%',
                                              desc: 'Indexed public sites searchable via traditional browsers.',
                                              color: 'from-blue-600/20 to-blue-900/10 border-blue-500/30 text-blue-200',
                                              activeColor: 'bg-blue-600/30 border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.15)]',
                                              tech: 'Protocols: HTTPS, DNS, HTTP/3',
                                              use: 'Google, Wikis, public portals'
                                            },
                                            {
                                              key: 'deep',
                                              title: 'Deep Web',
                                              percentage: '90%',
                                              desc: 'Unindexed portals, dynamic databases behind credentials.',
                                              color: 'from-amber-600/20 to-amber-900/10 border-amber-500/30 text-amber-200',
                                              activeColor: 'bg-amber-600/30 border-amber-400 text-white shadow-[0_0_12px_rgba(245,158,11,0.15)]',
                                              tech: 'Protocols: OAuth 2.0, SSL/TLS, SQL',
                                              use: 'Private databases, bank logins, medical'
                                            },
                                            {
                                              key: 'dark',
                                              title: 'Dark Web',
                                              percentage: '6%',
                                              desc: 'Overlay networks requiring specific cryptographic tools.',
                                              color: 'from-purple-600/20 to-purple-900/10 border-purple-500/30 text-purple-200',
                                              activeColor: 'bg-purple-600/30 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.15)]',
                                              tech: 'Protocols: Onion Routing, SOCKS5, PGP',
                                              use: 'Hidden onion nodes, secure drop boxes'
                                            }
                                          ].map((layer) => {
                                            const isActive = activeIcebergLayer === layer.key;
                                            return (
                                              <button
                                                key={layer.key}
                                                onClick={() => {
                                                  setActiveIcebergLayer(layer.key as any);
                                                  setTorNewPostLayer(layer.key as any);
                                                }}
                                                className={`w-full text-left p-2.5 rounded-lg border bg-gradient-to-r ${isActive ? layer.activeColor : layer.color} hover:bg-black/20 transition-all cursor-pointer flex flex-col gap-1`}
                                              >
                                                <div className="flex justify-between items-center">
                                                  <span className="font-extrabold text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                                                    <span className={`w-2 h-2 rounded-full ${layer.key === 'surface' ? 'bg-blue-400' : layer.key === 'deep' ? 'bg-amber-400' : 'bg-purple-400'}`} />
                                                    {layer.title}
                                                  </span>
                                                  <span className="text-[10px] font-mono font-bold opacity-80">{layer.percentage} of Internet</span>
                                                </div>
                                                <p className="text-[10px] text-slate-300 font-sans leading-tight mt-0.5">{layer.desc}</p>
                                              </button>
                                            );
                                          })}
                                        </div>
                                      </div>

                                      {/* Detail Panel of Selected Layer with insert helper */}
                                      <div className="bg-[#12081c]/60 border border-purple-500/10 rounded-lg p-2.5 space-y-2">
                                        {activeIcebergLayer === 'surface' && (
                                          <div className="text-[10px] space-y-1.5 animate-in fade-in duration-200">
                                            <div className="font-bold text-blue-300">Surface Web Details:</div>
                                            <div className="text-slate-300 font-sans leading-tight">These pages are indexed by traditional web crawlers. Standard web browsers resolve their names through DNS servers.</div>
                                            <div className="text-slate-400 font-mono text-[9px]">Tech Stack: HTTPS, standard TLS Certificates, IPv4/IPv6</div>
                                            <button
                                              onClick={() => {
                                                setTorNewPostContent('Surface Web audit note: 96% of the web remains hidden from public search engine indexes. Traditional DNS resolution leaves IP traces.');
                                                setTorNewPostLayer('surface');
                                              }}
                                              className="w-full py-1 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-300 hover:text-white font-semibold rounded text-[9.5px] transition-all cursor-pointer"
                                            >
                                              Draft Surface Web Post Template
                                            </button>
                                          </div>
                                        )}
                                        {activeIcebergLayer === 'deep' && (
                                          <div className="text-[10px] space-y-1.5 animate-in fade-in duration-200">
                                            <div className="font-bold text-amber-300">Deep Web Details:</div>
                                            <div className="text-slate-300 font-sans leading-tight">Comprises confidential data. It requires specific query parameters, session authentication, paywalls, or database access.</div>
                                            <div className="text-slate-400 font-mono text-[9px]">Tech Stack: OAuth 2.0, Secure Database APIs, Firewalls, Intranets</div>
                                            <button
                                              onClick={() => {
                                                setTorNewPostContent('Deep Web classification alert: Secured intranets, patient medical databases, and banking portals make up the largest chunk of digital bandwidth.');
                                                setTorNewPostLayer('deep');
                                              }}
                                              className="w-full py-1 bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/30 text-amber-300 hover:text-white font-semibold rounded text-[9.5px] transition-all cursor-pointer"
                                            >
                                              Draft Deep Web Post Template
                                            </button>
                                          </div>
                                        )}
                                        {activeIcebergLayer === 'dark' && (
                                          <div className="text-[10px] space-y-1.5 animate-in fade-in duration-200">
                                            <div className="font-bold text-purple-300">Dark Web Details:</div>
                                            <div className="text-slate-300 font-sans leading-tight">An intentional overlay network accessed via cryptographic browsers (Tor/I2P). Employs multi-layered onion routing tunnels.</div>
                                            <div className="text-slate-400 font-mono text-[9px]">Tech Stack: Onion Routing, ED25519 cryptography, SOCKS5 proxies</div>
                                            <button
                                              onClick={() => {
                                                setTorNewPostContent('Dark Web telemetry warning: Active circuit structures utilize triple-hop cryptographic handshakes. Check coordinates map to verify entropy.');
                                                setTorNewPostLayer('dark');
                                              }}
                                              className="w-full py-1 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-300 hover:text-white font-semibold rounded text-[9.5px] transition-all cursor-pointer"
                                            >
                                              Draft Dark Web Post Template
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Right Column: Whisper Wall Chat Bulletin & Form */}
                                    <div className="col-span-12 xl:col-span-7 flex flex-col justify-between space-y-3">
                                      
                                      {/* Filter Toolbar */}
                                      <div className="flex justify-between items-center bg-black/20 p-1.5 border border-purple-500/10 rounded-lg">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Filter by Layer:</span>
                                        <div className="flex gap-1">
                                          {[
                                            { label: 'All', key: 'all' },
                                            { label: 'Surface', key: 'surface' },
                                            { label: 'Deep', key: 'deep' },
                                            { label: 'Dark', key: 'dark' }
                                          ].map((btn) => (
                                            <button
                                              key={btn.key}
                                              onClick={() => setTorChatLayerFilter(btn.key as any)}
                                              className={`px-2 py-0.5 rounded text-[9.5px] font-bold transition-all cursor-pointer ${
                                                torChatLayerFilter === btn.key 
                                                  ? 'bg-purple-600 text-white' 
                                                  : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/30'
                                              }`}
                                            >
                                              {btn.label}
                                            </button>
                                          ))}
                                        </div>
                                      </div>

                                      {/* List of anonymous posts with classification badges */}
                                      <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                                        {torChatPosts
                                          .filter(post => torChatLayerFilter === 'all' || post.layer === torChatLayerFilter)
                                          .map((post) => (
                                            <div key={post.id} className="bg-[#1f142c] p-2.5 rounded-xl border border-purple-500/10 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
                                              <div className="flex justify-between items-center text-[10px] font-mono text-purple-400 mb-1 border-b border-purple-500/5 pb-0.5">
                                                <span className="font-extrabold flex items-center gap-1">
                                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                                    post.layer === 'surface' ? 'bg-blue-400' : post.layer === 'deep' ? 'bg-amber-400' : 'bg-purple-400'
                                                  }`} />
                                                  {post.name}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                  <span className={`text-[8px] font-bold px-1.5 rounded uppercase font-sans tracking-wide border ${
                                                    post.layer === 'surface' 
                                                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                                      : post.layer === 'deep' 
                                                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                                                      : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                  }`}>
                                                    {post.layer || 'dark'}
                                                  </span>
                                                  <span className="text-[9px] text-slate-500">{post.timestamp}</span>
                                                </div>
                                              </div>
                                              <p className="text-slate-200 font-sans leading-relaxed text-[10.5px] select-text">
                                                {post.content}
                                              </p>
                                            </div>
                                          ))}
                                        {torChatPosts.filter(post => torChatLayerFilter === 'all' || post.layer === torChatLayerFilter).length === 0 && (
                                          <div className="text-center text-slate-500 py-6 text-[10px] italic">
                                            No bulletin posts listed for this web category. Be the first to transmit!
                                          </div>
                                        )}
                                      </div>

                                      {/* Add post form with Layer dropdown/toggle */}
                                      <div className="bg-black/40 border border-purple-500/15 rounded-xl p-3 space-y-2.5">
                                        <div className="flex justify-between items-center">
                                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Publish New Anonymous Message</span>
                                          <div className="flex items-center gap-1">
                                            <span className="text-[8.5px] font-bold text-slate-400 uppercase font-mono mr-1">Post To:</span>
                                            {(['surface', 'deep', 'dark'] as const).map((layer) => (
                                              <button
                                                key={layer}
                                                onClick={() => setTorNewPostLayer(layer)}
                                                className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border transition-all cursor-pointer ${
                                                  torNewPostLayer === layer
                                                    ? layer === 'surface'
                                                      ? 'bg-blue-500/20 text-blue-300 border-blue-400/50'
                                                      : layer === 'deep'
                                                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                                                      : 'bg-purple-500/20 text-purple-300 border-purple-400/50'
                                                    : 'bg-transparent text-slate-500 border-transparent hover:text-slate-400'
                                                }`}
                                              >
                                                {layer}
                                              </button>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="grid grid-cols-12 gap-2">
                                          <div className="col-span-12 sm:col-span-3">
                                            <input
                                              type="text"
                                              placeholder="Handle Name"
                                              value={torNewPostUser}
                                              onChange={(e) => setTorNewPostUser(e.target.value)}
                                              className="w-full bg-[#20152c] border border-purple-500/20 rounded p-1.5 text-[10.5px] outline-none text-white placeholder-purple-400/50 font-mono"
                                            />
                                          </div>
                                          <div className="col-span-12 sm:col-span-9">
                                            <input
                                              type="text"
                                              placeholder="Enter anonymous bulletin update content..."
                                              value={torNewPostContent}
                                              onChange={(e) => setTorNewPostContent(e.target.value)}
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter' && torNewPostContent.trim()) {
                                                  const newP = {
                                                    id: `post-${Date.now()}`,
                                                    name: torNewPostUser.trim() || 'AnonymousOnion',
                                                    content: torNewPostContent,
                                                    timestamp: 'Just now',
                                                    layer: torNewPostLayer
                                                  };
                                                  setTorChatPosts([newP, ...torChatPosts]);
                                                  setTorNewPostContent('');
                                                }
                                              }}
                                              className="w-full bg-[#20152c] border border-purple-500/20 rounded p-1.5 text-[10.5px] outline-none text-white placeholder-purple-400/50"
                                            />
                                          </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-[9px] text-slate-500 italic">
                                            Your PGP signing signature is auto-generated cryptographically.
                                          </span>
                                          <button
                                            onClick={() => {
                                              if (!torNewPostContent.trim()) return;
                                              const newP = {
                                                id: `post-${Date.now()}`,
                                                name: torNewPostUser.trim() || 'AnonymousOnion',
                                                content: torNewPostContent,
                                                timestamp: 'Just now',
                                                layer: torNewPostLayer
                                              };
                                              setTorChatPosts([newP, ...torChatPosts]);
                                              setTorNewPostContent('');
                                            }}
                                            className="px-4 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded text-[10px] transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-purple-950/20"
                                          >
                                            <Plus className="w-3 h-3" />
                                            <span>Transmit Bulletin</span>
                                          </button>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              ) : torUrl.includes('leakdb4u5t3x.onion') ? (
                                /* Cyber Intelligence Leak Hub */
                                <div className="space-y-4">
                                  <div className="border-b border-purple-500/15 pb-3 flex justify-between items-center">
                                    <div>
                                      <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                                        <Skull className="w-4 h-4 text-purple-400" />
                                        <span>Simulated Intelligence Leak Base</span>
                                      </h3>
                                      <p className="text-[11px] text-slate-400">
                                        Repository index of redacted vulnerabilities, exploits, and cybersecurity audits.
                                      </p>
                                    </div>
                                    {torActiveLeak && (
                                      <button 
                                        onClick={() => setTorActiveLeak(null)}
                                        className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer"
                                      >
                                        &larr; Back to List
                                      </button>
                                    )}
                                  </div>

                                  {!torActiveLeak ? (
                                    /* Leak lists */
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                      {[
                                        {
                                          id: 'leak1',
                                          title: 'CVE-2024-SOCKET-BYPASS',
                                          category: 'Kernel Vulnerability',
                                          date: '2026-05-12',
                                          desc: 'A raw sockets ring-buffer bypass in Linux kernel versions prior to v6.8.5 allowing root escalation.'
                                        },
                                        {
                                          id: 'leak2',
                                          title: 'SAT-TELEMETRY-DECRYPTED',
                                          category: 'Hardware Audit',
                                          date: '2026-06-30',
                                          desc: 'De-scrambled signal log metrics from commercial low-earth-orbit communication arrays.'
                                        },
                                        {
                                          id: 'leak3',
                                          title: 'FIBER-TAP-INTEGRITY',
                                          category: 'Infrastructure Audit',
                                          date: '2026-07-15',
                                          desc: 'Simulated diagnostic analysis of signal dampening indicators inside oceanic underwater fiber trunks.'
                                        }
                                      ].map((lk) => (
                                        <button
                                          key={lk.id}
                                          onClick={() => setTorActiveLeak(lk)}
                                          className="text-left p-3 rounded-xl bg-[#20152b] border border-purple-500/10 hover:border-purple-500/30 transition-all cursor-pointer flex flex-col justify-between"
                                        >
                                          <div>
                                            <div className="flex justify-between items-center mb-1">
                                              <span className="font-extrabold text-purple-300 text-[11px]">{lk.title}</span>
                                              <span className="text-[9px] bg-purple-950 px-1.5 py-0.2 rounded text-slate-400">{lk.category}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-300 leading-normal line-clamp-2">{lk.desc}</p>
                                          </div>
                                          <div className="text-[9px] text-slate-400 font-mono mt-2 flex justify-between">
                                            <span>Posted: {lk.date}</span>
                                            <span className="text-purple-400 font-bold hover:underline">Read audit files &rarr;</span>
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  ) : (
                                    /* View details of selected leak */
                                    <div className="bg-black/30 border border-purple-500/15 rounded-xl p-3.5 space-y-3">
                                      <div className="flex justify-between items-center border-b border-purple-500/10 pb-1.5">
                                        <div>
                                          <span className="text-[9px] text-purple-400 uppercase font-mono tracking-wider">{torActiveLeak.category}</span>
                                          <h4 className="font-extrabold text-white text-sm">{torActiveLeak.title}</h4>
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-400">Released: {torActiveLeak.date}</span>
                                      </div>
                                      <p className="text-slate-300 leading-relaxed text-[11px]">
                                        {torActiveLeak.desc}
                                      </p>

                                      <div className="space-y-1.5 pt-1">
                                        <span className="text-[8.5px] font-bold text-purple-400 uppercase tracking-widest block">Decrypted Log Trace Fragment:</span>
                                        <pre className="bg-black p-2.5 rounded-lg border border-purple-500/10 text-[9px] font-mono text-emerald-400 overflow-x-auto max-h-[140px] select-all leading-relaxed">
                                          {torActiveLeak.id === 'leak1' ? (
                                            `[KERN_AUDIT] sys_perf_event_open interface mismatch\n[KERN_AUDIT] ring_buffer_map bypass detected at address offset 0xffffff90040a\n[EXPLOIT_PAYLOAD] Injecting payload into thread context...\n[EXPLOIT_PAYLOAD] Gaining privileged credentials...\n[SUCCESS] Current UID: 0 (root)\n# whoami\nroot`
                                          ) : torActiveLeak.id === 'leak2' ? (
                                            `SATELLITE DOWNLINK BEACON RECEIVED\nFREQ: 11.752 GHz (Ku-Band Transponder)\nDECODER STATUS: Sync Lock established\nDATA PACKET_HEAD: [SYN] [ACK] [BEACON_PULSE]\nCHANNELS: 16 multiplex streams decrypted\nCARRIER TO NOISE: 14.5 dB`
                                          ) : (
                                            `OCEANIC TRUNK FIBER-TAP-DETECTOR LOGS\nCABLE PATHWAY: Trans-Atlantic Trunk 4 (TAT-4)\nLOSS RATE DIAGNOSTICS: 0.04 dB/km dampening anomaly at 1,421 km mark\nCOHERENT SIGNAL ANALYZER: Interferometer phase distortion detected\nALERT: Potential external laser-split physical tap active on strand B-12.`
                                          )}
                                        </pre>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                /* Default Tor Project Portal Page */
                                <div className="space-y-5 text-center py-6">
                                  <div className="w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
                                    <Globe className="w-8 h-8" />
                                  </div>
                                  <div className="space-y-1">
                                    <h3 className="font-serif font-extrabold text-white text-xl">Tor Project Onion Portal</h3>
                                    <p className="text-xs text-purple-300 max-w-sm mx-auto">
                                      Your traffic is routed safely. Protect your identity, safeguard your data, and defend against corporate mass surveillance.
                                    </p>
                                  </div>

                                  <div className="p-4 bg-[#231731]/40 border border-purple-500/10 rounded-xl max-w-md mx-auto text-left space-y-2">
                                    <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                                      <Check className="w-4 h-4 text-emerald-400" />
                                      <span>Onion Gateway Connection Status: Secured</span>
                                    </div>
                                    <div className="text-[11px] text-slate-300 space-y-1 font-sans">
                                      <div>• Incoming browser protocol requests are dynamically packaged in SOCKS5.</div>
                                      <div>• Current circuit exit gateway IP is <span className="font-mono text-purple-300">{torCircuit[2].ip}</span> ({torCircuit[2].country}).</div>
                                      <div>• JavaScript is fully sandboxed under <span className="font-bold text-white">Level: {torSecurityLevel}</span> rules.</div>
                                    </div>
                                  </div>

                                  <div className="flex justify-center gap-3">
                                    <button 
                                      onClick={() => {
                                        setTorUrl('https://duckgo3v67uf.onion');
                                        setTorIsConnecting(true);
                                        setTimeout(() => setTorIsConnecting(false), 300);
                                      }}
                                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                                    >
                                      Launch DuckDuckGo Onion
                                    </button>
                                    <button 
                                      onClick={requestNewCircuit}
                                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                                    >
                                      Test New Routing Relay
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Rolling Live Tor.Service Logs view footer */}
                      <div className="bg-black px-3.5 py-2.5 border-t border-purple-500/15">
                        <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          <span>Live System Console Logs: tor.service</span>
                          <span className="text-[8px] bg-purple-500/20 text-purple-400 px-1.5 py-0.2 rounded font-bold">ACTIVE DAEMON</span>
                        </div>
                        <div className="h-20 bg-[#090510] border border-purple-500/5 rounded-lg p-2 overflow-y-auto text-[9.5px] font-mono text-purple-300/80 space-y-0.5 select-text scrollbar-thin">
                          {torLogs.slice(-10).map((log, lidx) => (
                            <div key={lidx}>{log}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 13. Kali NetHunter Simulator Panel */}
                {activeWindowApp === 'nethunter' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col gap-4 animate-in fade-in duration-300">
                    {/* Header bar controls */}
                    <div className="bg-[#121820] p-3 rounded-xl border border-red-500/20 flex flex-wrap gap-3 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skull className="w-5 h-5 text-red-500 animate-pulse" />
                        <span className="font-bold text-white text-sm">Kali NetHunter Platform</span>
                        <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.2 rounded font-bold uppercase">Mobile Chroot Active</span>
                      </div>

                      {/* NetHunter sub tabs */}
                      <div className="flex flex-wrap gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
                        {[
                          { id: 'dashboard', label: 'Dashboard' },
                          { id: 'badusb', label: 'HID (BadUSB)' },
                          { id: 'wireless', label: 'Wi-Fi (Monitor)' },
                          { id: 'bluetooth', label: 'Bluetooth' },
                          { id: 'commands', label: 'Commands' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setNhActiveTab(t.id as any)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                              nhActiveTab === t.id
                                ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* NetHunter active panel views */}
                    {nhActiveTab === 'dashboard' && (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* System Stats Card */}
                        <div className="md:col-span-5 bg-slate-900/90 border border-slate-850 p-4 rounded-xl flex flex-col justify-between">
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-1.5">Mobile Kernel Profile</span>
                            <div className="space-y-2 text-[10.5px]">
                              <div className="flex justify-between"><span className="text-slate-500">Device Platform:</span><span className="text-white font-bold">OnePlus 7 Pro (Chroot)</span></div>
                              <div className="flex justify-between"><span className="text-slate-500">Android Base OS:</span><span className="text-slate-300">Android 14 (OxygenOS SDK 34)</span></div>
                              <div className="flex justify-between"><span className="text-slate-500">Kernel Version:</span><span className="text-red-400 font-bold font-mono">4.14.117-NetHunter-v3.0</span></div>
                              <div className="flex justify-between"><span className="text-slate-500">SELinux Status:</span><span className="text-emerald-400 font-bold">Permissive</span></div>
                              <div className="flex justify-between"><span className="text-slate-500">HCI Bluetooth chip:</span><span className="text-sky-400">Qualcomm WCN3990 (Native)</span></div>
                              <div className="flex justify-between"><span className="text-slate-500">Wi-Fi chipset:</span><span className="text-amber-400">Atheros AR9271 (Monitor Mode)</span></div>
                            </div>
                          </div>
                          <div className="pt-3 border-t border-slate-850 flex justify-between items-center text-[10px] mt-3">
                            <span className="text-slate-500">Battery emulation:</span>
                            <span className="text-green-400 font-bold animate-pulse">84% • Charging (9V/2A)</span>
                          </div>
                        </div>

                        {/* Hacking Engine Diagnostics */}
                        <div className="md:col-span-7 bg-slate-900/90 border border-slate-850 p-4 rounded-xl space-y-3">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-1.5">Toolbox Chroot Diagnostics</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { label: 'Kali Chroot Environment', status: 'Active & Mounted', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
                              { label: 'HID (BadUSB) Gadget', status: 'Loaded & Emulated', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
                              { label: 'Packet Injection Frame Driver', status: 'Ready (rt2800usb)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
                              { label: 'BlueHydra BLE Tracker', status: 'Ready (hci0)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
                              { label: 'Ducky Script Encoder', status: 'v2.1 Integrated', color: 'text-red-400 bg-red-500/10 border-red-500/25' },
                              { label: 'Metasploit Core', status: 'MSFRPCD Active', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
                            ].map((diag, i) => (
                              <div key={i} className={`p-2.5 rounded-lg border flex flex-col justify-between ${diag.color}`}>
                                <span className="text-[9px] font-bold text-slate-300 truncate">{diag.label}</span>
                                <span className="text-[10px] font-bold mt-1 font-mono">{diag.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {nhActiveTab === 'badusb' && (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* BadUSB Attack Configuration */}
                        <div className="md:col-span-5 bg-slate-900/90 border border-slate-850 p-4 rounded-xl flex flex-col justify-between">
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-1.5">HID Keystroke Injection Settings</span>
                            
                            <div>
                              <label className="text-[10px] text-slate-500 block mb-1">Target Payload Script:</label>
                              <select
                                value={nhBadUsbPayload}
                                onChange={(e) => setNhBadUsbPayload(e.target.value)}
                                disabled={nhBadUsbStatus === 'injecting'}
                                className="w-full bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:border-red-500/40 text-xs font-mono"
                              >
                                <option value="reverse_shell">Reverse Shell (PowerShell TCP stream)</option>
                                <option value="rickroll">RickRoll (Instant full screen browser loop)</option>
                                <option value="harvester">Credential Harvester (Dumps LSASS processes)</option>
                              </select>
                            </div>

                            <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-[10px] text-slate-400 space-y-1">
                              <span className="font-bold text-slate-300 uppercase text-[9px] tracking-wider block">Payload Description:</span>
                              {nhBadUsbPayload === 'reverse_shell' && 'Emulates rapid key strikes to open a Windows Run prompt, execute an administrative powershell socket, and route a silent shell back to port 4444.'}
                              {nhBadUsbPayload === 'rickroll' && 'Injects keyboard commands to invoke browsers on the host target, navigates directly to the Rick Astley music broadcast, and toggles full screen at maximum volume.'}
                              {nhBadUsbPayload === 'harvester' && 'Injects payload strings to extract registry structures, processes, and memory tables containing host credential hashes for cracking.'}
                            </div>
                          </div>

                          <button
                            onClick={triggerNhBadUsbInject}
                            disabled={nhBadUsbStatus === 'injecting'}
                            className="w-full mt-4 p-2 bg-red-600 hover:bg-red-700 disabled:bg-red-950 text-white font-bold uppercase text-xs rounded tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {nhBadUsbStatus === 'injecting' ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Injecting Keystrokes ({nhBadUsbProgress}%)
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" />
                                Execute HID Attack
                              </>
                            )}
                          </button>
                        </div>

                        {/* Real-time Ducky logs */}
                        <div className="md:col-span-7 flex flex-col gap-2.5">
                          {nhBadUsbStatus === 'injecting' && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-red-400">
                                <span>HID payload streams pulsing...</span>
                                <span className="font-bold">{nhBadUsbProgress}%</span>
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-600 h-full transition-all duration-300" style={{ width: `${nhBadUsbProgress}%` }} />
                              </div>
                            </div>
                          )}

                          {nhBadUsbStatus === 'completed' && (
                            <div className="bg-red-950/20 border border-red-500/20 p-3 rounded-xl flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                                <Check className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-[10px] text-red-400 font-bold uppercase">Keystroke Script Completed!</div>
                                <div className="text-white text-[10px] mt-0.5 font-sans leading-relaxed">
                                  BadUSB emulation is back to idle state. Payload executed on simulated target host.
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex-grow bg-black p-3 rounded-xl h-44 overflow-y-auto text-[9.5px] text-red-400 font-mono border border-slate-900 space-y-1 leading-tight">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1 mb-1">Ducky Console HID Logs</span>
                            {nhBadUsbLogs.map((log, i) => <div key={i}>{log}</div>)}
                            {nhBadUsbLogs.length === 0 && <div className="text-slate-600 italic">Select a keystroke injector payload on the left, then click "Execute HID Attack" to begin.</div>}
                          </div>
                        </div>
                      </div>
                    )}

                    {nhActiveTab === 'wireless' && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Wireless Control Panel */}
                        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-850 p-4 rounded-xl flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-1.5">Mon0 Wireless Controller</span>

                            <button
                              onClick={triggerNhWifiScan}
                              disabled={nhWifiScanning || nhWifiAttackActive}
                              className="w-full p-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 font-bold uppercase text-[10px] rounded tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              {nhWifiScanning ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  Scanning Airwaves...
                                </>
                              ) : (
                                <>
                                  <Radio className="w-3.5 h-3.5 text-red-500" />
                                  Scan Local WiFi APs
                                </>
                              )}
                            </button>

                            {nhWifiResults.length > 0 && (
                              <div className="space-y-2.5 pt-2">
                                <div>
                                  <label className="text-[10px] text-slate-500 block mb-1">Selected Target SSID:</label>
                                  <select
                                    value={nhWifiTarget || ''}
                                    onChange={(e) => setNhWifiTarget(e.target.value)}
                                    className="w-full bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:border-red-500/40 text-xs"
                                  >
                                    <option value="">-- Choose Access Point --</option>
                                    {nhWifiResults.map((ap) => (
                                      <option key={ap.bssid} value={ap.ssid}>{ap.ssid} ({ap.bssid})</option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="text-[10px] text-slate-500 block mb-1">Wireless Attack Profile:</label>
                                  <select
                                    value={nhWifiAttackType}
                                    onChange={(e) => setNhWifiAttackType(e.target.value)}
                                    className="w-full bg-black text-white p-1.5 rounded border border-slate-800 focus:outline-none focus:border-red-500/40 text-xs"
                                  >
                                    <option value="deauth">Deauthentication Flood (Sniffs Handshake)</option>
                                    <option value="wps">WPS PIN Brute-force (Reaver)</option>
                                  </select>
                                </div>
                              </div>
                            )}
                          </div>

                          {nhWifiTarget && (
                            <button
                              onClick={triggerNhWifiAttack}
                              disabled={nhWifiAttackActive || nhWifiScanning}
                              className="w-full p-2 bg-red-600 hover:bg-red-700 disabled:bg-red-950 text-white font-bold uppercase text-xs rounded tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              {nhWifiAttackActive ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  Injecting Frames ({nhWifiAttackProgress}%)
                                </>
                              ) : (
                                <>
                                  <Skull className="w-3.5 h-3.5" />
                                  Launch Air Attack
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Wireless Access Points / Logs table */}
                        <div className="lg:col-span-8 flex flex-col gap-3">
                          <div className="bg-slate-900 border border-slate-850 rounded-xl p-3 h-44 overflow-y-auto">
                            {nhWifiResults.length > 0 ? (
                              <div className="space-y-1">
                                <div className="grid grid-cols-12 text-[9px] font-bold text-slate-500 uppercase border-b border-slate-950 pb-1 mb-1">
                                  <span className="col-span-4">SSID</span>
                                  <span className="col-span-3">BSSID (Mac)</span>
                                  <span className="col-span-1.5 text-center">Channel</span>
                                  <span className="col-span-1.5 text-center">Signal</span>
                                  <span className="col-span-2 text-right">Encryption</span>
                                </div>
                                <div className="space-y-1 font-mono text-[9.5px]">
                                  {nhWifiResults.map((ap) => (
                                    <div
                                      key={ap.bssid}
                                      onClick={() => setNhWifiTarget(ap.ssid)}
                                      className={`grid grid-cols-12 items-center py-1 border-b border-slate-850/40 cursor-pointer rounded px-1 hover:bg-slate-800 ${
                                        nhWifiTarget === ap.ssid ? 'bg-red-500/10 border-l border-red-500' : ''
                                      }`}
                                    >
                                      <span className="col-span-4 text-slate-200 font-bold truncate">{ap.ssid}</span>
                                      <span className="col-span-3 text-slate-400 font-mono truncate">{ap.bssid}</span>
                                      <span className="col-span-1.5 text-center text-yellow-500 font-bold">{ap.channel}</span>
                                      <span className="col-span-1.5 text-center text-emerald-400 font-bold">{ap.signal}</span>
                                      <span className="col-span-2 text-right">
                                        <span className={`px-1 py-0.2 rounded text-[8px] font-bold ${
                                          ap.encryption.includes('Open') ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                                        }`}>{ap.encryption.split(' ')[0]}</span>
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center text-xs p-4">
                                <Wifi className="w-8 h-8 text-slate-700 mb-2 animate-pulse" />
                                <p>No Wi-Fi access points parsed yet.</p>
                                <p className="text-[10px] text-slate-600 mt-1 font-sans">Click "Scan Local WiFi APs" to initialize monitor mode.</p>
                              </div>
                            )}
                          </div>

                          {/* Air Attack Standard Logs */}
                          <div className="bg-black p-3 rounded-xl h-36 overflow-y-auto text-[9.5px] text-red-300 font-mono border border-slate-900 space-y-1 leading-tight">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1 mb-1">Wireless Sweeper Stdout</span>
                            {nhWifiLogs.map((log, i) => <div key={i}>{log}</div>)}
                            {nhWifiLogs.length === 0 && <div className="text-slate-600 italic text-[10px]">Logs are populated in real-time when a scan or attack profile is triggered.</div>}
                          </div>
                        </div>
                      </div>
                    )}

                    {nhActiveTab === 'bluetooth' && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Bluetooth control panel */}
                        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-850 p-4 rounded-xl flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-1.5">BlueHydra BLE Controller</span>

                            <button
                              onClick={triggerNhBtScan}
                              disabled={nhBtScanning}
                              className="w-full p-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 font-bold uppercase text-[10px] rounded tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              {nhBtScanning ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  Sniffing BLE beacons...
                                </>
                              ) : (
                                <>
                                  <Radio className="w-3.5 h-3.5 text-blue-500" />
                                  Start Bluetooth Scan
                                </>
                              )}
                            </button>

                            <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-[9.5px] text-slate-400">
                              <span className="font-bold text-slate-300 uppercase text-[9px] tracking-wider block mb-1">BlueHydra Wardriving</span>
                              Collects BLE advertisement packages, filters raw signal telemetry, resolves Apple continuity tokens, and captures Classic device classes.
                            </div>
                          </div>
                        </div>

                        {/* Bluetooth beacon logs & results */}
                        <div className="lg:col-span-8 flex flex-col gap-3">
                          <div className="bg-slate-900 border border-slate-850 rounded-xl p-3 h-44 overflow-y-auto">
                            {nhBtResults.length > 0 ? (
                              <div className="space-y-1">
                                <div className="grid grid-cols-12 text-[9px] font-bold text-slate-500 uppercase border-b border-slate-950 pb-1 mb-1">
                                  <span className="col-span-4">Device Name</span>
                                  <span className="col-span-4">MAC Address</span>
                                  <span className="col-span-2 text-center">RSSI Signal</span>
                                  <span className="col-span-2 text-right">Class Type</span>
                                </div>
                                <div className="space-y-1 font-mono text-[9.5px]">
                                  {nhBtResults.map((dev) => (
                                    <div key={dev.mac} className="grid grid-cols-12 items-center py-1 border-b border-slate-850/40 px-1 hover:bg-slate-800">
                                      <span className="col-span-4 text-slate-200 font-bold truncate">{dev.name}</span>
                                      <span className="col-span-4 text-slate-400 font-mono truncate">{dev.mac}</span>
                                      <span className="col-span-2 text-center text-sky-400 font-bold">{dev.rssi}</span>
                                      <span className="col-span-2 text-right text-slate-300 truncate">{dev.type}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center text-xs p-4">
                                <Radio className="w-8 h-8 text-slate-700 mb-2 animate-pulse" />
                                <p>No Bluetooth devices sniffed yet.</p>
                                <p className="text-[10px] text-slate-600 mt-1 font-sans">Ensure Bluetooth adapter (hci0) is active, then trigger scanner.</p>
                              </div>
                            )}
                          </div>

                          <div className="bg-black p-3 rounded-xl h-36 overflow-y-auto text-[9.5px] text-blue-300 font-mono border border-slate-900 space-y-1 leading-tight">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1 mb-1">BlueHydra Daemon Log</span>
                            {nhBtLogs.map((log, i) => <div key={i}>{log}</div>)}
                            {nhBtLogs.length === 0 && <div className="text-slate-600 italic text-[10px]">Sniffer logs will populate when Bluetooth driver triggers search beacons.</div>}
                          </div>
                        </div>
                      </div>
                    )}

                    {nhActiveTab === 'commands' && (
                      <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-1.5">Fast Chroot Mobile Command Panel</span>
                          <span className="text-[10px] text-slate-400 block">Execute instant actions straight inside the Android Kali NetHunter workspace container:</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs font-bold">
                          {[
                            { title: 'Check Chroot Status', desc: 'Displays mounted folder mounts and root path states.', cmd: 'nethunter status' },
                            { title: 'Reboot Chroot Core', desc: 'Gracefully unmounts and boots up the Kali container daemon.', cmd: 'bootkali' },
                            { title: 'USB Keyboard Emulation', desc: 'Test USB gadget emulating protocol packets.', cmd: 'nethunter HID-test' },
                            { title: 'Initialize Keystroke Parser', desc: 'Loads ducky script injection system.', cmd: 'ducky-script --help' },
                          ].map((action, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setTerminalLines(prev => [
                                  ...prev,
                                  { type: 'input', text: `root@nethunter:~# ${action.cmd}` },
                                  { type: 'system', text: `[NetHunter CLI] Executing "${action.cmd}" inside chroot...` },
                                  { type: 'success', text: `Success: Action resolved completed. Container reported code status 0.` }
                                ]);
                                setNhActiveTab('dashboard');
                                setTerminalLines(prev => [...prev, { type: 'output', text: `[NetHunter] Chroot daemon verified. Running version v2024.2` }]);
                              }}
                              className="p-3 bg-slate-950 hover:bg-slate-900 text-left rounded-xl border border-slate-800 hover:border-red-500/20 cursor-pointer transition-all active:scale-95 flex flex-col justify-between space-y-1.5 group font-normal"
                            >
                              <span className="font-bold text-slate-200 group-hover:text-red-400 transition-colors">{action.title}</span>
                              <span className="text-[10.5px] text-slate-500 font-normal leading-normal">{action.desc}</span>
                              <code className="text-[9.5px] font-mono text-red-400 bg-red-500/10 p-0.5 px-2 rounded block w-fit mt-1">{action.cmd}</code>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeWindowApp === 'vpn' && (
                  <div className="font-mono text-xs text-slate-300 flex flex-col gap-4 animate-in fade-in duration-300">
                    {/* Header bar controls */}
                    <div className="bg-[#121820] p-3 rounded-xl border border-purple-500/20 flex flex-wrap gap-3 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className={`w-5 h-5 ${vpnConnected ? 'text-emerald-400 animate-pulse' : 'text-purple-500'}`} />
                        <div>
                          <span className="font-bold text-white text-sm">WireGuard Dynamic VPN Core</span>
                          <span className="text-[9px] text-slate-400 block font-sans">Multi-hop Cryptographic Microsecond Tunnel</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Protocol Selection Dropdown */}
                        <div className="flex items-center gap-1.5 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800">
                          <span className="text-[9px] text-slate-500 uppercase font-bold">Protocol:</span>
                          <select
                            value={vpnProtocol}
                            onChange={(e) => setVpnProtocol(e.target.value as any)}
                            className="bg-transparent border-none text-[10px] text-purple-300 font-bold focus:outline-none focus:ring-0"
                          >
                            <option value="wireguard">WireGuard v2</option>
                            <option value="openvpn">OpenVPN Pro</option>
                            <option value="ipsec">IPSec Core</option>
                          </select>
                        </div>

                        {/* Kill Switch Toggle */}
                        <button
                          onClick={() => setVpnKillSwitch(!vpnKillSwitch)}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                            vpnKillSwitch 
                              ? 'bg-red-500/10 text-red-400 border-red-500/30' 
                              : 'bg-slate-900/40 text-slate-500 border-slate-800'
                          }`}
                          title="Prevent IP leaks if connection drops"
                        >
                          <Lock className="w-3 h-3" />
                          <span>KillSwitch: {vpnKillSwitch ? 'ON' : 'OFF'}</span>
                        </button>

                        {/* Connection Switch */}
                        <button
                          onClick={() => {
                            if (vpnConnected) {
                              setVpnConnected(false);
                              setVpnDownloadSpeed(0);
                              setVpnUploadSpeed(0);
                              setVpnLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] VPN Disconnected. Public IP reverted.`]);
                            } else {
                              setVpnIsConnecting(true);
                              setTimeout(() => {
                                setVpnConnected(true);
                                rotateVpnIp();
                                setVpnIsConnecting(false);
                              }, 800);
                            }
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            vpnConnected 
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/15' 
                              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/15'
                          }`}
                        >
                          {vpnIsConnecting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Handshaking...</span>
                            </>
                          ) : (
                            <>
                              <Power className="w-3.5 h-3.5" />
                              <span>{vpnConnected ? 'CONNECTED' : 'CONNECT VPN'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Main VPN Dashboard Layout */}
                    <div className="grid grid-cols-12 gap-4">
                      
                      {/* Left: Instant Microsecond IP Changer Block */}
                      <div className="col-span-12 lg:col-span-6 bg-slate-900/90 border border-slate-850 p-4 rounded-xl flex flex-col justify-between space-y-4">
                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                              Microsecond Address Rotator
                            </span>
                            <span className="text-[8px] bg-sky-500/10 text-sky-400 border border-sky-500/25 px-1.5 py-0.2 rounded font-bold font-mono">
                              LATENCY SPEED: µs-SCALE
                            </span>
                          </div>

                          {/* IP Address Card Display */}
                          <div className="bg-black/60 border border-slate-800 rounded-xl p-4 text-center relative overflow-hidden group">
                            {vpnIsRotating && (
                              <div className="absolute inset-0 bg-purple-600/10 animate-pulse flex items-center justify-center">
                                <div className="text-[11px] font-bold text-purple-300 animate-bounce">SHIFTING SOCKET METRICS...</div>
                              </div>
                            )}
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold mb-1">
                              Your Simulated Public IP Address
                            </span>
                            <div className="font-mono text-2xl font-extrabold text-white tracking-wider select-text flex items-center justify-center gap-2 py-1.5">
                              <Globe className={`w-5 h-5 ${vpnConnected ? 'text-emerald-400' : 'text-slate-500'}`} />
                              <span className={vpnIsRotating ? 'blur-[2px] transition-all duration-75' : 'transition-all'}>
                                {vpnConnected ? vpnActiveIp : '172.18.96.1'}
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 mt-1">
                              {vpnConnected ? (
                                <span className="text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  SECURED TUNNEL (HOPS ACTIVE)
                                </span>
                              ) : (
                                <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-full font-bold">
                                  DIRECT INSECURE ISP IP
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Trigger Control Area */}
                          <div className="space-y-3">
                            <button
                              onClick={() => {
                                if (!vpnConnected) {
                                  setVpnConnected(true);
                                }
                                rotateVpnIp();
                              }}
                              disabled={vpnIsRotating}
                              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-extrabold uppercase rounded-lg tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/10 active:scale-[0.98] transition-all"
                            >
                              <RefreshCw className={`w-4 h-4 ${vpnIsRotating ? 'animate-spin' : ''}`} />
                              <span>CHANGE IP ADDRESS IN MICROSECONDS</span>
                            </button>

                            <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-[10px]">
                              <div>
                                <span className="text-slate-500 block">LAST IP SHIFT:</span>
                                <span className="font-bold text-sky-400 font-mono">
                                  {vpnLastRotationUs ? `${vpnLastRotationUs} µs` : 'N/A'}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500 block">ALGORITHM:</span>
                                <span className="font-bold text-slate-300 font-mono">Curve25519-ECDH</span>
                              </div>
                            </div>
                          </div>

                          {/* Auto-Rotation Controls */}
                          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850 space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <Zap className={`w-3.5 h-3.5 ${vpnAutoRotate ? 'text-amber-400' : 'text-slate-500'}`} />
                                <span className="text-[10px] font-bold text-slate-300">Continuous Auto-Rotate Burst Mode</span>
                              </div>
                              <button
                                onClick={() => {
                                  if (!vpnConnected && !vpnAutoRotate) {
                                    setVpnConnected(true);
                                  }
                                  setVpnAutoRotate(!vpnAutoRotate);
                                }}
                                className={`px-2 py-0.5 rounded text-[9px] font-bold border transition-all cursor-pointer uppercase ${
                                  vpnAutoRotate 
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' 
                                    : 'bg-transparent text-slate-500 border-slate-800 hover:text-slate-400'
                                }`}
                              >
                                {vpnAutoRotate ? 'ACTIVE' : 'OFF'}
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] text-slate-500">Rotation Cycle:</span>
                              <div className="flex gap-1 flex-1">
                                {[500, 1000, 2000, 5000].map((ms) => (
                                  <button
                                    key={ms}
                                    onClick={() => setVpnRotationIntervalMs(ms)}
                                    className={`flex-1 py-0.5 rounded text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                                      vpnRotationIntervalMs === ms 
                                        ? 'bg-purple-600 border-purple-500 text-white' 
                                        : 'bg-black/30 border-slate-800 text-slate-400 hover:bg-black/50'
                                    }`}
                                  >
                                    {ms >= 1000 ? `${ms / 1000}s` : `${ms}ms`}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="bg-[#12081c] border border-purple-500/10 rounded-xl p-3 text-[10.5px] leading-relaxed text-slate-300 font-sans">
                          <span className="font-bold text-purple-400 font-mono block mb-1">How it shifts in microseconds:</span>
                          The WireGuard tunnel interface (<code className="text-pink-400 font-mono text-[10px]">wg0</code>) leverages asynchronous kernel-space sockets. Rather than tearing down full client connections, we hot-swap ephemeral crypto-key affinity routes in memory, resolving DNS and mapping a new randomized peer path within nanoseconds.
                        </div>
                      </div>

                      {/* Right: Server List & Latency Statistics */}
                      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                        
                        {/* Server Location Cards Selector */}
                        <div className="bg-slate-900/90 border border-slate-850 p-4 rounded-xl flex flex-col space-y-2.5">
                          <div className="flex flex-col gap-2 border-b border-slate-800 pb-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                                Offshore Gateways ({vpnServers.length} Countries Available)
                              </span>
                              <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                                All Countries Added
                              </span>
                            </div>

                            {/* Search input */}
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search country, capital, IP or jurisdiction..."
                                value={vpnSearchQuery}
                                onChange={(e) => setVpnSearchQuery(e.target.value)}
                                className="w-full bg-black/50 border border-slate-800 focus:border-purple-500/50 rounded-lg px-2.5 py-1 text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-0 font-sans"
                              />
                            </div>

                            {/* Region Pills */}
                            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[9.5px]">
                              {(['All', 'Europe', 'Americas', 'Asia', 'Africa', 'Oceania'] as const).map((reg) => {
                                const isActive = vpnRegionFilter === reg;
                                return (
                                  <button
                                    key={reg}
                                    onClick={() => setVpnRegionFilter(reg)}
                                    className={`px-2 py-0.5 rounded-full border font-bold transition-all cursor-pointer whitespace-nowrap ${
                                      isActive
                                        ? 'bg-purple-600 border-purple-500 text-white'
                                        : 'bg-black/30 border-slate-850 text-slate-400 hover:text-slate-300'
                                    }`}
                                  >
                                    {reg}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Filtered list of servers */}
                          <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                            {vpnServers
                              .filter((srv) => {
                                const query = vpnSearchQuery.toLowerCase();
                                const matchesSearch =
                                  srv.name.toLowerCase().includes(query) ||
                                  srv.jurisdiction.toLowerCase().includes(query) ||
                                  srv.id.toLowerCase().includes(query) ||
                                  srv.ip.includes(query);
                                const matchesRegion = vpnRegionFilter === 'All' || srv.region === vpnRegionFilter;
                                return matchesSearch && matchesRegion;
                              })
                              .map((srv) => {
                                const isSelected = vpnLocation === srv.id && vpnConnected;
                                return (
                                  <button
                                    key={srv.id}
                                    onClick={() => {
                                      if (!vpnConnected) {
                                        setVpnConnected(true);
                                      }
                                      setVpnLocation(srv.id);
                                      rotateVpnIp(srv.id);
                                    }}
                                    className={`p-2 rounded-xl text-left border bg-gradient-to-r transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                                      isSelected
                                        ? 'from-purple-950/50 to-indigo-950/30 border-purple-500/40 shadow-inner text-white'
                                        : 'from-black/40 to-slate-900/10 border-slate-850 text-slate-400 hover:border-slate-800'
                                    }`}
                                  >
                                    <div className="flex justify-between items-center w-full">
                                      <span className="font-extrabold text-[10.5px] text-slate-200 truncate flex items-center gap-1.5 w-[85%]">
                                        <span>{srv.flag}</span>
                                        <span className="truncate">{srv.name}</span>
                                      </span>
                                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-400 animate-ping' : 'bg-slate-700'}`} />
                                    </div>
                                    <div className="flex justify-between items-center text-[9px] font-mono mt-1 w-full text-slate-400">
                                      <span className="text-[8px] truncate text-slate-500 w-[60%] text-left">{srv.jurisdiction}</span>
                                      <span className="text-purple-400 font-bold">{srv.latency} ms</span>
                                    </div>
                                  </button>
                                );
                              })}
                          </div>
                        </div>

                        {/* Real-time stats section */}
                        <div className="bg-slate-900/90 border border-slate-850 p-4 rounded-xl flex flex-col space-y-3">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-1.5">
                            Tunnel Diagnostic Logs & Latency History
                          </span>

                          {/* Mini sparkline visualization of rotation history */}
                          <div className="h-16 bg-black/60 rounded-lg p-2 flex flex-col justify-between font-mono text-[9px]">
                            <div className="flex justify-between text-[8px] text-slate-500 uppercase pb-1 border-b border-slate-900 mb-1 font-bold">
                              <span>IP Swap Audit Feed</span>
                              <span>Speed Metric</span>
                            </div>
                            <div className="overflow-y-auto max-h-[40px] space-y-1.5 text-slate-300 pr-1 scrollbar-thin">
                              {vpnRotationHistory.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                  <span className="truncate max-w-[170px] text-slate-400">
                                    {item.timestamp} → <span className="text-white font-bold">{item.newIp}</span>
                                  </span>
                                  <span className="text-emerald-400 font-bold">{item.durationUs} µs</span>
                                </div>
                              ))}
                              {vpnRotationHistory.length === 0 && (
                                <div className="text-slate-600 italic text-center py-1">Rotate IP address to begin diagnostic logs.</div>
                              )}
                            </div>
                          </div>

                          {/* Live wire logs */}
                          <div className="bg-black border border-slate-950 p-2.5 rounded-lg h-24 overflow-y-auto text-[9.5px] text-pink-400/90 font-mono space-y-1 leading-normal select-text scrollbar-thin">
                            {vpnLogs.map((log, i) => <div key={i}>{log}</div>)}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Core Shell Component */}
          <div className="flex-1 rounded-2xl bg-slate-950 border border-slate-200 dark:border-white/5 shadow-lg overflow-hidden flex flex-col">
            
            {/* Terminal Tab Header */}
            <div className="bg-slate-900 dark:bg-black/80 p-3 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold">
              <div className="flex items-center gap-1.5 text-slate-300">
                <TermIcon className="w-4 h-4 text-orange-500" />
                <span>root@novaOS:~#</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-normal">Terminal Theme:</span>
                <select
                  value={terminalTheme}
                  onChange={(e) => setTerminalTheme(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-[10px] p-0.5 px-1 rounded focus:outline-none font-mono"
                >
                  <option value="ubuntu">Ubuntu Slate</option>
                  <option value="classic">Retro Green</option>
                  <option value="cyberpunk">Cyberpunk Neon</option>
                  <option value="matrix">Matrix Rain</option>
                  <option value="monokai">Monokai Pro</option>
                  <option value="kali">Kali Dragon Dark</option>
                </select>
              </div>
            </div>

            {/* Scrolling output window */}
            <div className={`flex-grow p-4 font-mono text-xs overflow-y-auto h-72 space-y-1.5 ${themeStyle.bg} scrollbar-thin`}>
              {terminalLines.map((line, idx) => {
                let colorClass = 'text-slate-300';
                if (line.type === 'input') colorClass = themeStyle.input;
                else if (line.type === 'error') colorClass = 'text-red-400 font-bold';
                else if (line.type === 'success') colorClass = 'text-emerald-400 font-bold';
                else if (line.type === 'system') colorClass = 'text-indigo-400 font-bold';
                else if (line.type === 'header') colorClass = 'text-white font-extrabold border-b border-slate-900 pb-1.5 mb-2 block';

                return (
                  <div key={idx} className="leading-normal whitespace-pre-wrap">
                    {line.type === 'input' ? (
                      <span className="flex items-start gap-1">
                        <span className={themeStyle.prompt}>root@novaOS:~#</span>
                        <span className={themeStyle.input}>{line.text.replace(/root@novaOS:.*#/, '').replace('root@novaOS:~# ', '')}</span>
                      </span>
                    ) : (
                      <span className={colorClass}>{line.text}</span>
                    )}
                  </div>
                );
              })}
              {isShellWaiting && (
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Executing server-side Gemini assist API link...
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Text input prompt */}
            <form onSubmit={handleCommandSubmit} className="flex bg-slate-900 border-t border-slate-800/80">
              <span className="px-3.5 py-3 text-xs font-bold text-orange-400 bg-slate-950 font-mono">#</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleTerminalKeyDown}
                placeholder="Type 'help' to audit system commands or 'ask-ai [question]' for Gemini..."
                className="flex-1 bg-transparent px-4 py-3 text-xs font-mono text-white focus:outline-none placeholder-slate-600 focus:bg-black/10"
                autoComplete="off"
                disabled={isShellWaiting}
              />
              <button
                type="submit"
                disabled={isShellWaiting}
                className="px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono uppercase tracking-widest cursor-pointer"
              >
                Run
              </button>
            </form>

            {/* Quick action buttons */}
            <div className="bg-slate-950 border-t border-slate-900 p-2 flex flex-wrap gap-2 text-[10px] text-slate-500 font-mono">
              <span className="self-center">Suggested shell queries:</span>
              <button type="button" onClick={() => setInputVal('neofetch')} className="bg-slate-900 hover:bg-slate-800 hover:text-white p-1 px-2 rounded border border-slate-850 cursor-pointer">neofetch</button>
              <button type="button" onClick={() => setInputVal('apt list --installed')} className="bg-slate-900 hover:bg-slate-800 hover:text-white p-1 px-2 rounded border border-slate-850 cursor-pointer">apt list</button>
              <button type="button" onClick={() => setInputVal('ask-ai explain bash prompt colors')} className="bg-slate-900 hover:bg-slate-800 hover:text-white p-1 px-2 rounded border border-slate-850 text-indigo-400 cursor-pointer">ask-ai [bash]</button>
              <button type="button" onClick={() => setInputVal('snake')} className="bg-slate-900 hover:bg-slate-800 hover:text-white p-1 px-2 rounded border border-slate-850 text-green-400 cursor-pointer">play snake</button>
            </div>

          </div>

        </div>

      </div>

      {/* Windows 11 Ultra Premium Upgrade Prompt Modal */}
      {showWindowsUpgradePrompt && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-center">
            <button 
              onClick={() => setShowWindowsUpgradePrompt(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer transition-colors"
            >
              ×
            </button>
            
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
              <Sparkles className="w-8 h-8 text-white fill-white animate-pulse" />
            </div>

            <h3 className="text-lg font-display font-black text-white tracking-tight mb-2">
              Windows 11 Pro Lifetime Edition
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-5">
              Unlock the complete high-fidelity Windows 11 virtualized desktop environment directly inside NovaOS! Includes genuine retail key activation, cmd.exe shell, AI search, and preloaded apps.
            </p>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex gap-2 text-[11px] text-slate-300">
                <span className="text-amber-500 font-bold">★</span>
                <span>Includes Lifetime Genuine Digital License Key</span>
              </div>
              <div className="flex gap-2 text-[11px] text-slate-300">
                <span className="text-amber-500 font-bold">★</span>
                <span>Allocated 4 Cores CPU &amp; 8GB RAM virtualization limits</span>
              </div>
              <div className="flex gap-2 text-[11px] text-slate-300">
                <span className="text-amber-500 font-bold">★</span>
                <span>Full access to Microsoft Store Premium Bundle apps</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  setShowWindowsUpgradePrompt(false);
                  onOpenPricing?.();
                }}
                className="flex-1 bg-gradient-to-r from-amber-500 to-purple-600 hover:opacity-90 text-white font-black py-2.5 px-4 rounded-xl text-xs tracking-wider uppercase transition-all shadow shadow-amber-500/10 active:scale-95 cursor-pointer"
              >
                Upgrade to Ultra Premium
              </button>
              <button
                onClick={() => setShowWindowsUpgradePrompt(false)}
                className="flex-grow bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
