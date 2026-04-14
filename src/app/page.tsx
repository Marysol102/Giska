'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================
// GAME DATA
// ============================================================

const QUESTIONS = [
  { id:'cat_animal', text:'¿Es un animal?', category:'category', icon:'🐾', property:'is_animal' },
  { id:'cat_food', text:'¿Es comida o bebida?', category:'category', icon:'🍽️', property:'is_food' },
  { id:'cat_object', text:'¿Es un objeto?', category:'category', icon:'📦', property:'is_object' },
  { id:'cat_body', text:'¿Es una parte del cuerpo?', category:'category', icon:'👤', property:'is_body_part' },
  { id:'cat_place', text:'¿Es un lugar?', category:'category', icon:'🏠', property:'is_place' },
  { id:'cat_emotion', text:'¿Es una emoción o sentimiento?', category:'category', icon:'🎭', property:'is_emotion' },
  { id:'cat_action', text:'¿Es una acción o verbo?', category:'category', icon:'⚡', property:'is_action' },
  { id:'cat_clothing', text:'¿Es ropa o accesorio?', category:'category', icon:'👔', property:'is_clothing' },
  { id:'cat_vehicle', text:'¿Es un vehículo?', category:'category', icon:'🚗', property:'is_vehicle' },
  { id:'cat_plant', text:'¿Es una planta?', category:'category', icon:'🌱', property:'is_plant' },
  { id:'cat_weather', text:'¿Es un fenómeno del clima?', category:'category', icon:'⛈️', property:'is_weather' },
  { id:'cat_profession', text:'¿Es una profesión u oficio?', category:'category', icon:'👷', property:'is_profession' },
  { id:'nat_natural', text:'¿Existe en la naturaleza?', category:'nature', icon:'🌿', property:'is_natural' },
  { id:'nat_alive', text:'¿Está vivo?', category:'nature', icon:'💓', property:'is_alive' },
  { id:'nat_manmade', text:'¿Fue creado por humanos?', category:'nature', icon:'🏭', property:'is_man_made' },
  { id:'phy_tangible', text:'¿Se puede tocar?', category:'physical', icon:'🤚', property:'is_tangible' },
  { id:'phy_heavy', text:'¿Es pesado?', category:'physical', icon:'🏋️', property:'is_heavy' },
  { id:'phy_soft', text:'¿Es suave o flexible?', category:'physical', icon:'🧸', property:'is_soft' },
  { id:'phy_round', text:'¿Es redondo?', category:'physical', icon:'🔵', property:'is_round' },
  { id:'phy_shiny', text:'¿Brilla o refleja luz?', category:'physical', icon:'✨', property:'is_shiny' },
  { id:'phy_colorful', text:'¿Es colorido?', category:'physical', icon:'🎨', property:'is_colorful' },
  { id:'phy_cold', text:'¿Es frío al tacto?', category:'physical', icon:'❄️', property:'is_cold' },
  { id:'phy_parts', text:'¿Tiene varias partes?', category:'physical', icon:'🧩', property:'has_parts' },
  { id:'loc_indoors', text:'¿Se encuentra comúnmente dentro de una casa?', category:'location', icon:'🏠', property:'is_found_indoors' },
  { id:'loc_outdoors', text:'¿Se encuentra al aire libre?', category:'location', icon:'🌳', property:'is_found_outdoors' },
  { id:'loc_water', text:'¿Se encuentra en el agua?', category:'location', icon:'🌊', property:'is_found_in_water' },
  { id:'loc_sky', text:'¿Se encuentra en el cielo o en lo alto?', category:'location', icon:'☁️', property:'is_found_in_sky' },
  { id:'use_daily', text:'¿Lo usas a diario?', category:'use', icon:'🔄', property:'is_used_daily' },
  { id:'use_buy', text:'¿Se puede comprar en una tienda?', category:'use', icon:'🛒', property:'can_be_bought' },
  { id:'use_edible', text:'¿Se puede comer o beber?', category:'use', icon:'😋', property:'is_edible' },
  { id:'use_dangerous', text:'¿Es peligroso?', category:'use', icon:'⚠️', property:'is_dangerous' },
  { id:'use_sound', text:'¿Hace sonido?', category:'use', icon:'🔊', property:'makes_sound' },
  { id:'use_wear', text:'¿Se puede llevar puesto?', category:'use', icon:'👗', property:'can_be_worn' },
  { id:'size_big', text:'¿Es más grande que una persona?', category:'size', icon:'📏', property:'is_bigger_than_person' },
  { id:'size_hand', text:'¿Cabe en una mano?', category:'size', icon:'✋', property:'fits_in_hand' },
];

const CATEGORIES: Record<string, { label: string; icon: string; description: string }> = {
  category: { label:'Categoría', icon:'🏷️', description:'¿Qué tipo de cosa es?' },
  nature: { label:'Naturaleza', icon:'🌿', description:'¿Es natural o artificial?' },
  physical: { label:'Físico', icon:'🔬', description:'¿Cómo es físicamente?' },
  location: { label:'Ubicación', icon:'📍', description:'¿Dónde se encuentra?' },
  use: { label:'Uso', icon:'🔧', description:'¿Para qué sirve?' },
  size: { label:'Tamaño', icon:'📐', description:'¿Qué tamaño tiene?' },
};

type WordMeta = Record<string, boolean>;

interface WordObj {
  word: string;
  language: string;
  flag: string;
  meaning: string;
  meta: WordMeta;
}

const WORDS: WordObj[] = [
  { word:"Schmetterling", language:"Alemán", flag:"🇩🇪", meaning:"Mariposa", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Schildkröte", language:"Alemán", flag:"🇩🇪", meaning:"Tortuga", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:false, is_round:true, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:true, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Nashorn", language:"Alemán", flag:"🇩🇪", meaning:"Rinoceronte", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Eisbär", language:"Alemán", flag:"🇩🇪", meaning:"Oso polar", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Escargot", language:"Francés", flag:"🇫🇷", meaning:"Caracol", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:true, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Girafe", language:"Francés", flag:"🇫🇷", meaning:"Jirafa", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Tora", language:"Japonés", flag:"🇯🇵", meaning:"Tigre", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Delfino", language:"Italiano", flag:"🇮🇹", meaning:"Delfín", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:true, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Cachorro", language:"Portugués", flag:"🇧🇷", meaning:"Cachorro", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Papagaio", language:"Portugués", flag:"🇧🇷", meaning:"Loro", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_sky:true, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Schokolade", language:"Alemán", flag:"🇩🇪", meaning:"Chocolate", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Apfel", language:"Alemán", flag:"🇩🇪", meaning:"Manzana", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:true, is_shiny:true, is_colorful:true, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Fromage", language:"Francés", flag:"🇫🇷", meaning:"Queso", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:true, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Pomodoro", language:"Italiano", flag:"🇮🇹", meaning:"Tomate", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:true, is_shiny:true, is_colorful:true, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Abacaxi", language:"Portugués", flag:"🇧🇷", meaning:"Piña", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Jordgubbe", language:"Sueco", flag:"🇸🇪", meaning:"Fresa", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Pane", language:"Italiano", flag:"🇮🇹", meaning:"Pan", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Cerveja", language:"Portugués", flag:"🇧🇷", meaning:"Cerveza", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:true, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Kahvi", language:"Finlandés", flag:"🇫🇮", meaning:"Café", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Miele", language:"Italiano", flag:"🇮🇹", meaning:"Miel", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:true, is_colorful:true, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Schlüssel", language:"Alemán", flag:"🇩🇪", meaning:"Llave", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:true, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Handschuh", language:"Alemán", flag:"🇩🇪", meaning:"Guante", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:true, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:true, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Parapluie", language:"Francés", flag:"🇫🇷", meaning:"Paraguas", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Specchio", language:"Italiano", flag:"🇮🇹", meaning:"Espejo", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:true, has_parts:false, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Cucchiaio", language:"Italiano", flag:"🇮🇹", meaning:"Cuchara", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:true, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Staubsauger", language:"Alemán", flag:"🇩🇪", meaning:"Aspiradora", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Kello", language:"Finlandés", flag:"🇫🇮", meaning:"Reloj", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:true, is_shiny:true, is_colorful:false, is_cold:true, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:true, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Sakset", language:"Finlandés", flag:"🇫🇮", meaning:"Tijeras", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:true, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Buku", language:"Indonesio", flag:"🇮🇩", meaning:"Libro", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Montagne", language:"Francés", flag:"🇫🇷", meaning:"Montaña", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:true, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:true, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Fleur", language:"Francés", flag:"🇫🇷", meaning:"Flor", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:true, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Soleil", language:"Francés", flag:"🇫🇷", meaning:"Sol", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:true, is_soft:false, is_round:true, is_shiny:true, is_colorful:true, is_cold:false, has_parts:false, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Étoile", language:"Francés", flag:"🇫🇷", meaning:"Estrella", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:true, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Sakura", language:"Japonés", flag:"🇯🇵", meaning:"Flor de cerezo", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:true, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Vulkan", language:"Alemán", flag:"🇩🇪", meaning:"Volcán", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:true, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Snöflinga", language:"Sueco", flag:"🇸🇪", meaning:"Copo de nieve", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:true, is_colorful:false, is_cold:true, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Château", language:"Francés", flag:"🇫🇷", meaning:"Castillo", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:true, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Bibliothèque", language:"Francés", flag:"🇫🇷", meaning:"Biblioteca", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:true, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Leuchtturm", language:"Alemán", flag:"🇩🇪", meaning:"Faro", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:true, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Cuore", language:"Italiano", flag:"🇮🇹", meaning:"Corazón", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:true, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Main", language:"Francés", flag:"🇫🇷", meaning:"Mano", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:true, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Öga", language:"Sueco", flag:"🇸🇪", meaning:"Ojo", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:true, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:true, is_shiny:true, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Hattu", language:"Finlandés", flag:"🇫🇮", meaning:"Sombrero", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:true, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:true, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:true, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Schal", language:"Alemán", flag:"🇩🇪", meaning:"Bufanda", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:true, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:true, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Stivali", language:"Italiano", flag:"🇮🇹", meaning:"Botas", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:true, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:true, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Fahrrad", language:"Alemán", flag:"🇩🇪", meaning:"Bicicleta", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:true, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:true, is_shiny:true, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:true, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Lentokone", language:"Finlandés", flag:"🇫🇮", meaning:"Avión", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:true, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Laiva", language:"Finlandés", flag:"🇫🇮", meaning:"Barco", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:true, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:true, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Treno", language:"Italiano", flag:"🇮🇹", meaning:"Tren", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:true, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Regenbogen", language:"Alemán", flag:"🇩🇪", meaning:"Arcoíris", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:true, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Orage", language:"Francés", flag:"🇫🇷", meaning:"Tormenta", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Tuuli", language:"Finlandés", flag:"🇫🇮", meaning:"Viento", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:true, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:true, has_parts:false, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Simba", language:"Swahili", flag:"🇰🇪", meaning:"León", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Tembo", language:"Swahili", flag:"🇰🇪", meaning:"Elefante", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Zebra", language:"Swahili", flag:"🇰🇪", meaning:"Cebra", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Baum", language:"Alemán", flag:"🇩🇪", meaning:"Árbol", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:true, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Ruusu", language:"Finlandés", flag:"🇫🇮", meaning:"Rosa", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:true, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Gioia", language:"Italiano", flag:"🇮🇹", meaning:"Alegría", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:true, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Courage", language:"Francés", flag:"🇫🇷", meaning:"Coraje", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:true, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Danser", language:"Francés", flag:"🇫🇷", meaning:"Bailar", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:true, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Schlafen", language:"Alemán", flag:"🇩🇪", meaning:"Dormir", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:true, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Peur", language:"Francés", flag:"🇫🇷", meaning:"Miedo", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:true, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Médecin", language:"Francés", flag:"🇫🇷", meaning:"Médico", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:true, is_natural:false, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Ingegnere", language:"Italiano", flag:"🇮🇹", meaning:"Ingeniero", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:true, is_natural:false, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Talvi", language:"Finlandés", flag:"🇫🇮", meaning:"Invierno", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:true, has_parts:false, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Jää", language:"Finlandés", flag:"🇫🇮", meaning:"Hielo", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:true, is_colorful:false, is_cold:true, has_parts:false, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:true, is_found_in_sky:true, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Feuerwerk", language:"Alemán", flag:"🇩🇪", meaning:"Fuegos artificiales", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:true, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Bijou", language:"Francés", flag:"🇫🇷", meaning:"Joya", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:true, is_colorful:true, is_cold:true, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:true, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Kühlschrank", language:"Alemán", flag:"🇩🇪", meaning:"Refrigerador", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:true, is_colorful:false, is_cold:true, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Skägg", language:"Sueco", flag:"🇸🇪", meaning:"Barba", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:true, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:false, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Pilvi", language:"Finlandés", flag:"🇫🇮", meaning:"Nube", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:true, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Silta", language:"Finlandés", flag:"🇫🇮", meaning:"Puente", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:true, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:true, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Porta", language:"Italiano", flag:"🇮🇹", meaning:"Puerta", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Brev", language:"Sueco", flag:"🇸🇪", meaning:"Carta", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Ladder", language:"Inglés", flag:"🇬🇧", meaning:"Escalera", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Vespa", language:"Italiano", flag:"🇮🇹", meaning:"Avispa", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Kamen", language:"Checo", flag:"🇨🇿", meaning:"Piedra", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:true, has_parts:false, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:true, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Fontana", language:"Italiano", flag:"🇮🇹", meaning:"Fuente", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:true, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:true, is_soft:false, is_round:true, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:true, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Mercato", language:"Italiano", flag:"🇮🇹", meaning:"Mercado", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:true, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Krokodil", language:"Holandés", flag:"🇳🇱", meaning:"Cocodrilo", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:true, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Kanguru", language:"Alemán", flag:"🇩🇪", meaning:"Canguro", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Panda", language:"Chino (pinyin)", flag:"🇨🇳", meaning:"Oso panda", meta:{ is_animal:true, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
  { word:"Suklaa", language:"Finlandés", flag:"🇫🇮", meaning:"Chocolate", meta:{ is_animal:false, is_food:true, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:true, is_colorful:false, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:true, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Korva", language:"Finlandés", flag:"🇫🇮", meaning:"Oreja", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:true, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Matto", language:"Finlandés", flag:"🇫🇮", meaning:"Alfombra", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:false, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:true, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Sieni", language:"Finlandés", flag:"🇫🇮", meaning:"Seta", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:true, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:true, is_dangerous:true, makes_sound:false, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Sumo", language:"Japonés", flag:"🇯🇵", meaning:"Luchador de sumo", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:true, is_natural:false, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:true, is_round:true, is_shiny:false, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Relâmpago", language:"Portugués", flag:"🇧🇷", meaning:"Relámpago", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:false, is_soft:false, is_round:false, is_shiny:true, is_colorful:true, is_cold:false, has_parts:false, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:true, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Aurinko", language:"Finlandés", flag:"🇫🇮", meaning:"Sol", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:true, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:false, is_heavy:true, is_soft:false, is_round:true, is_shiny:true, is_colorful:true, is_cold:false, has_parts:false, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Hjärta", language:"Sueco", flag:"🇸🇪", meaning:"Corazón", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:true, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:true, is_man_made:false, is_tangible:true, is_heavy:false, is_soft:true, is_round:false, is_shiny:false, is_colorful:true, is_cold:false, has_parts:true, is_found_indoors:false, is_found_outdoors:false, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:true }},
  { word:"Yama", language:"Japonés", flag:"🇯🇵", meaning:"Montaña", meta:{ is_animal:false, is_food:false, is_object:false, is_body_part:false, is_place:true, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:true, is_alive:false, is_man_made:false, is_tangible:true, is_heavy:true, is_soft:false, is_round:false, is_shiny:false, is_colorful:false, is_cold:true, has_parts:true, is_found_indoors:false, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:true, is_used_daily:false, can_be_bought:false, is_edible:false, is_dangerous:true, makes_sound:false, can_be_worn:false, is_bigger_than_person:true, fits_in_hand:false }},
  { word:"Balalaika", language:"Ruso", flag:"🇷🇺", meaning:"Guitarra rusa", meta:{ is_animal:false, is_food:false, is_object:true, is_body_part:false, is_place:false, is_emotion:false, is_action:false, is_clothing:false, is_vehicle:false, is_plant:false, is_weather:false, is_profession:false, is_natural:false, is_alive:false, is_man_made:true, is_tangible:true, is_heavy:false, is_soft:false, is_round:true, is_shiny:true, is_colorful:false, is_cold:false, has_parts:true, is_found_indoors:true, is_found_outdoors:true, is_found_in_water:false, is_found_in_sky:false, is_used_daily:false, can_be_bought:true, is_edible:false, is_dangerous:false, makes_sound:true, can_be_worn:false, is_bigger_than_person:false, fits_in_hand:false }},
];

// ============================================================
// CONSTANTS
// ============================================================

const MAX_QUESTIONS = 20;
const MAX_GUESSES = 5;
const GAME_START = new Date(2025, 0, 1);

// ============================================================
// TYPES
// ============================================================

interface AskedQuestion {
  questionId: string;
  answer: boolean;
  isAI?: boolean;
  aiText?: string;
  aiExplanation?: string;
}

interface GameState {
  questionsAsked: AskedQuestion[];
  guessAttempts: string[];
  completed: boolean;
  won: boolean;
  startTime: number;
  puzzleNumber: number;
}

// ============================================================
// HELPERS
// ============================================================

function normalize(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function checkGuess(guess: string, meaning: string) {
  const g = normalize(guess);
  const m = normalize(meaning);
  if (g === m) return true;
  if (m.includes(g) && g.length >= 3) return true;
  if (g.includes(m) && m.length >= 3) return true;
  return false;
}

function getStars(won: boolean, count: number) {
  if (!won) return '💔';
  if (count <= 3) return '⭐⭐⭐';
  if (count <= 7) return '⭐⭐';
  return '⭐';
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function GiskaGame() {
  // Core state
  const [dailyWord, setDailyWord] = useState<WordObj | null>(null);
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState<AskedQuestion[]>([]);
  const [guessAttempts, setGuessAttempts] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [won, setWon] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // AI state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // UI state
  const [guessInput, setGuessInput] = useState('');
  const [guessState, setGuessState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHelp, setShowHelp] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [questionRound, setQuestionRound] = useState(1);
  const [toast, setToast] = useState('');

  // God Mode state
  const [godMode, setGodMode] = useState(false);
  const [godTab, setGodTab] = useState<'bank' | 'ai' | 'random'>('bank');
  const [isRandomMode, setIsRandomMode] = useState(false);
  const konamiRef = useRef<string[]>([]);
  const logoTapRef = useRef(0);
  const logoTapTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const historyRef = useRef<HTMLDivElement>(null);
  const guessInputRef = useRef<HTMLInputElement>(null);
  const allQuestionsRef = useRef<AskedQuestion[]>([]);
  const [godBankStats, setGodBankStats] = useState<Record<string, number>>({});
  const [godAIStats, setGodAIStats] = useState<Record<string, number>>({});
  const [godStatsLoading, setGodStatsLoading] = useState(false);
  
 // ---- SAVE GOD STATS ----
  const saveGodStats = useCallback(async (questionId: string, isAI: boolean, text?: string) => {
    try {
      await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, isAI, text }),
      });
    } catch {}
  }, []);

  // ---- LOAD GOD STATS FROM SERVER ----
  const loadGodStatsFromServer = useCallback(async () => {
    setGodStatsLoading(true);
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setGodBankStats(data.bankStats || {});
      setGodAIStats(data.aiStats || {});
    } catch {
      setGodBankStats({});
      setGodAIStats({});
    } finally {
      setGodStatsLoading(false);
    }
  }, []);
  // ---- KONAMI CODE ----
  useEffect(() => {
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
    const handler = (e: KeyboardEvent) => {
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > KONAMI.length) konamiRef.current.shift();
      if (konamiRef.current.length === KONAMI.length && konamiRef.current.every((k, i) => k === KONAMI[i])) {
        konamiRef.current = [];
        setGodMode(prev => {
          if (!prev) loadGodStatsFromServer();
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ---- LOGO TAP (mobile alternative) ----
  const handleLogoTap = useCallback(() => {
    logoTapRef.current++;
    if (logoTapTimer.current) clearTimeout(logoTapTimer.current);
    logoTapTimer.current = setTimeout(() => { logoTapRef.current = 0; }, 2000);
    if (logoTapRef.current >= 7) {
      logoTapRef.current = 0;
      setGodMode(prev => {
        if (!prev) loadGodStatsFromServer();
        return !prev;
      });
    }
  }, [loadGodStatsFromServer]);

  // ---- RANDOM WORD ----
  const playRandomWord = useCallback(() => {
    if (WORDS.length <= 1) return;
    let idx: number;
    do { idx = Math.floor(Math.random() * WORDS.length); } while (WORDS[idx] === dailyWord);
    const word = WORDS[idx];
    setDailyWord(word);
    setQuestionsAsked([]);
    setGuessAttempts([]);
    setCompleted(false);
    setWon(false);
    setStartTime(Date.now());
    setElapsed(0);
    setGuessInput('');
    setGuessState('idle');
    setExpandedCategory(null);
    setAiQuestion('');
    setAiError('');
    setShowResults(false);
    setIsRandomMode(true);
    setGodMode(false);
    showToast('🎲 Palabra aleatoria: ' + word.word);
  }, [dailyWord]);

  // ---- BACK TO DAILY ----
  const backToDaily = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.floor((today.getTime() - GAME_START.getTime()) / (1000 * 60 * 60 * 24));
    const idx = ((days % WORDS.length) + WORDS.length) % WORDS.length;
    const word = WORDS[idx];
    setDailyWord(word);
    setQuestionsAsked([]);
    setGuessAttempts([]);
    setCompleted(false);
    setWon(false);
    setStartTime(Date.now());
    setElapsed(0);
    setGuessInput('');
    setGuessState('idle');
    setExpandedCategory(null);
    setAiQuestion('');
    setAiError('');
    setShowResults(false);
    setIsRandomMode(false);
    showToast('📅 Modo diario restaurado');
  }, []);

  // ---- TOTAL QUESTION COUNT (all rounds) ----
  const totalQuestionsAsked = allQuestionsRef.current.length + questionsAsked.length;

  // ---- HANDLE CONTINUE (new round after 20 questions) ----
  const handleContinue = useCallback(() => {
    allQuestionsRef.current = [...allQuestionsRef.current, ...questionsAsked];
    setQuestionsAsked([]);
    setQuestionRound(prev => prev + 1);
    setShowLimitModal(false);
    showToast('🔄 Ronda ' + (questionRound + 1) + ' — ¡Sigue preguntando!');
  }, [questionsAsked, questionRound]);

  // ---- HANDLE SEE ANSWER ----
  const handleSeeAnswer = useCallback(() => {
    allQuestionsRef.current = [...allQuestionsRef.current, ...questionsAsked];
    setShowLimitModal(false);
    setCompleted(true);
    setWon(false);
    setTimeout(() => setShowResults(true), 500);
  }, [questionsAsked]);

  // ---- INIT ----
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.floor((today.getTime() - GAME_START.getTime()) / (1000 * 60 * 60 * 24));
    const pNum = days + 1;
    const idx = ((days % WORDS.length) + WORDS.length) % WORDS.length;
    const word = WORDS[idx];

    setPuzzleNumber(pNum);
    setDailyWord(word);

    // Load saved state
    try {
      const saved = localStorage.getItem(`giska_${pNum}`);
      if (saved) {
        const s = JSON.parse(saved) as GameState;
        if (s.puzzleNumber === pNum) {
          setQuestionsAsked(s.questionsAsked || []);
          setGuessAttempts(s.guessAttempts || []);
          setCompleted(s.completed || false);
          setWon(s.won || false);
          setStartTime(s.startTime || Date.now());
          if (s.completed) {
            setTimeout(() => setShowResults(true), 300);
          }
        }
      }
    } catch {}
  }, []);

  // ---- TIMER ----
  useEffect(() => {
    const interval = setInterval(() => {
      if (completed) { clearInterval(interval); return; }
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [completed, startTime]);

  // ---- SCROLL HISTORY ----
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [questionsAsked]);

  // ---- SAVE ----
  const saveState = useCallback(() => {
    try {
      localStorage.setItem(`giska_${puzzleNumber}`, JSON.stringify({
        questionsAsked, guessAttempts, completed, won, startTime, puzzleNumber
      } as GameState));
    } catch {}
  }, [questionsAsked, guessAttempts, completed, won, startTime, puzzleNumber]);

  // ---- GAME LOGIC ----
  const askQuestion = useCallback((questionId: string) => {
    if (completed || questionsAsked.length >= MAX_QUESTIONS || showLimitModal) return;
    if (questionsAsked.some(q => q.questionId === questionId)) return;
    if (!dailyWord) return;

    const q = QUESTIONS.find(x => x.id === questionId);
    if (!q) return;

    const answer = !!dailyWord.meta[q.property];
    const newAsked = [...questionsAsked, { questionId, answer }];
    setQuestionsAsked(newAsked);
    saveGodStats(questionId, false);

    if (newAsked.length >= MAX_QUESTIONS) {
      setShowLimitModal(true);
    }
  }, [completed, questionsAsked, dailyWord]);

  // After state updates, save
  useEffect(() => {
    if (dailyWord) saveState();
  }, [questionsAsked, guessAttempts, completed, won, dailyWord, saveState]);

  const handleGuess = useCallback(() => {
    const guess = guessInput.trim();
    if (!guess || completed || !dailyWord) return;
    if (guessAttempts.length >= MAX_GUESSES) return;

    if (checkGuess(guess, dailyWord.meaning)) {
      const newAttempts = [...guessAttempts, guess];
      setGuessAttempts(newAttempts);
      setGuessInput('');
      setGuessState('correct');
      setCompleted(true);
      setWon(true);
      launchConfetti();
      setTimeout(() => setShowResults(true), 800);
      setTimeout(() => setGuessState('idle'), 2000);
    } else {
      const newAttempts = [...guessAttempts, guess];
      setGuessAttempts(newAttempts);
      setGuessInput('');
      setGuessState('wrong');
      setTimeout(() => setGuessState('idle'), 600);
      if (newAttempts.length >= MAX_GUESSES) {
        setCompleted(true);
        setWon(false);
        setTimeout(() => setShowResults(true), 500);
      }
    }
  }, [guessInput, completed, dailyWord, guessAttempts]);

  // ---- AI QUESTION ----
  const handleAIQuestion = useCallback(async () => {
    const question = aiQuestion.trim();
    if (!question || aiLoading || completed || !dailyWord || showLimitModal) return;
    if (questionsAsked.length >= MAX_QUESTIONS) return;

    setAiLoading(true);
    setAiError('');

    try {
      const prevQs = questionsAsked.map(q => ({
        q: (QUESTIONS.find(x => x.id === q.questionId)?.text || q.aiText || ''),
        a: q.answer
      }));

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          meaning: dailyWord.meaning,
          word: dailyWord.word,
          language: dailyWord.language,
          meta: dailyWord.meta,
          previousQuestions: prevQs,
        }),
      });

      const data = await res.json();

      // Show specific messages for limit / no api key
      if (data.noApiKey) {
        setAiError('⚠️ La IA no está configurada. Usa las preguntas predefinidas.');
        setAiLoading(false);
        return;
      }
      if (data.dailyLimitReached) {
        setAiError('🌙 Hoy se han agotado las preguntas a la IA. ¡Vuelve mañana!');
        setAiLoading(false);
        return;
      }
      if (data.answer === 'no_sense') {
        setAiError(data.explanation || 'No puedo responder a esa pregunta.');
        setAiLoading(false);
        return;
      }

      const newAsked = [...questionsAsked, {
        questionId: `ai_${Date.now()}`,
        answer: !!data.answer,
        isAI: true,
        aiText: question,
        aiExplanation: data.explanation,
      }];
      setQuestionsAsked(newAsked);
      setAiQuestion('');
      saveGodStats(`ai_${Date.now()}`, true, question);

      if (newAsked.length >= MAX_QUESTIONS) {
        setShowLimitModal(true);
      }
    } catch {
      setAiError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setAiLoading(false);
    }
  }, [aiQuestion, aiLoading, completed, dailyWord, questionsAsked]);

  // ---- SHARE ----
  const handleShare = useCallback(() => {
    if (!dailyWord) return;
    const totalCount = allQuestionsRef.current.length + questionsAsked.length;
    const stars = getStars(won, totalCount);
    const status = won ? '🏆 ¡Adivinado!' : '❌ No adivinado';
    let text = `GISKA #${puzzleNumber} ${stars}\n`;
    text += `${status}\n`;
    text += `Preguntas: ${totalCount}/${questionRound > 1 ? MAX_QUESTIONS * questionRound + ' (ronda ' + questionRound + ')' : MAX_QUESTIONS}`;
    if (!won) text += ` | Intentos: ${guessAttempts.length}/${MAX_GUESSES}`;
    text += '\n';
    const allQs = [...allQuestionsRef.current, ...questionsAsked];
    const icons = allQs.map(q => {
      const question = QUESTIONS.find(x => x.id === q.questionId);
      return `${question?.icon || '🤖'}${q.answer ? '✅' : '❌'}`;
    });
    for (let i = 0; i < icons.length; i += 5) {
      text += icons.slice(i, i + 5).join(' ') + '\n';
    }
    text += '\n¡Juega a GISKA!';

    navigator.clipboard.writeText(text).then(() => {
      showToast('¡Resultado copiado al portapapeles! 📋');
    }).catch(() => {
      showToast('¡Resultado copiado! 📋');
    });
  }, [dailyWord, won, questionsAsked, guessAttempts, puzzleNumber, questionRound]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // ---- CONFETTI ----
  const launchConfetti = () => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:200;pointer-events:none;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#1B3A4B', '#4ECDC4', '#6B8F71', '#C45B3F', '#F0C987', '#7DD3FC', '#E6EDF3'];
    const pieces: { x: number; y: number; w: number; h: number; color: string; vx: number; vy: number; rotation: number; vr: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        w: 6 + Math.random() * 8,
        h: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        opacity: 1,
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.rotation += p.vr;
        if (frame > 40) p.opacity -= 0.015;
        if (p.opacity > 0 && p.y < canvas.height + 50) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });
      frame++;
      if (alive) requestAnimationFrame(animate);
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); document.body.removeChild(canvas); }
    }
    animate();
  };

  // ---- TIMER FORMAT ----
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // ---- RENDER ----
  if (!dailyWord) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin-loader w-8 h-8 border-3 border-[var(--ring)] border-t-transparent rounded-full" />
    </div>
  );

  const questionsLeft = MAX_QUESTIONS - questionsAsked.length;
  const guessesLeft = MAX_GUESSES - guessAttempts.length;
  const stars = getStars(won, totalQuestionsAsked);

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="glass-header sticky top-0 z-40 border-b border-[var(--border)]">
        <div className="max-w-[672px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight select-none" style={{ fontFamily: 'var(--font-space-grotesk)' }} onClick={handleLogoTap}>
              <span className="text-[var(--primary)]">GIS</span>
              <span className="text-[var(--ring)]">KA</span>
            </h1>
            <span className="text-[0.7rem] font-mono bg-[var(--muted)] text-[var(--foreground)] px-2 py-0.5 rounded-full border border-[var(--border)]">
              {isRandomMode ? '🎲 Aleatorio' : `#${puzzleNumber}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[var(--muted-foreground)] font-mono text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span>{formatTime(elapsed)}</span>
            </div>
            <button
              onClick={() => setShowHelp(true)}
              className="p-1.5 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Cómo jugar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-[672px] mx-auto w-full px-4 py-6 flex flex-col gap-6">

        {/* WORD CARD */}
        <div className="word-card-aurora p-6 sm:p-8 text-center">
          <div className="text-3xl mb-1">{dailyWord.flag}</div>
          <span className="inline-block text-sm font-medium bg-[var(--muted)] text-[var(--foreground)] px-3 py-0.5 rounded-full mb-3">
            {dailyWord.language}
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tighter word-glow animate-pop-in mb-2"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary)' }}
          >
            {dailyWord.word}
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">¿Qué significa esta palabra en español?</p>

          {completed && (
            <div className="mt-4 animate-fade-in">
              <div className="h-px bg-[var(--border)] my-4" />
              <span className="text-xl">{won ? '🏆' : '❌'}</span>
              <div className="font-bold text-lg mt-1">{won ? '¡Correcto!' : 'La respuesta era:'}</div>
              <p className="text-2xl font-extrabold mt-1" style={{ color: 'var(--primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                {dailyWord.meaning}
              </p>
            </div>
          )}
        </div>

        {/* PROGRESS */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-[var(--muted-foreground)]">
            <span className="flex items-center gap-2">
              Preguntas: <strong className="text-[var(--foreground)]">{totalQuestionsAsked}</strong>
              {questionRound > 1 && (
                <span className="text-[0.65rem] font-bold bg-[var(--ring)]/20 text-[var(--ring)] px-1.5 py-0.5 rounded-full">
                  R{questionRound}
                </span>
              )}
              /{MAX_QUESTIONS}
            </span>
            <span>Intentos: <strong className="text-[var(--foreground)]">{guessAttempts.length}</strong>/{MAX_GUESSES}</span>
          </div>
          <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-400"
              style={{
                width: `${(questionsAsked.length / MAX_QUESTIONS) * 100}%`,
                background: 'linear-gradient(90deg, var(--primary), var(--ring))',
              }}
            />
          </div>
          <div className="flex gap-1">
            {Array.from({ length: MAX_QUESTIONS }).map((_, i) => {
              const q = questionsAsked[i];
              const cls = q
                ? q.answer
                  ? 'bg-[var(--ring)]'
                  : 'bg-[var(--destructive)]'
                : 'bg-[var(--muted)]';
              return <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-300 ${cls}`} />;
            })}
          </div>
        </div>

        {/* QUESTIONS SECTION */}
        {!completed && (
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Haz preguntas para descubrir la palabra
            </h3>

            {/* Categories Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {Object.entries(CATEGORIES).map(([cat, info]) => {
                const isActive = expandedCategory === cat;
                const catQs = QUESTIONS.filter(q => q.category === cat);
                const askedCount = catQs.filter(q => questionsAsked.some(qa => qa.questionId === q.id)).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setExpandedCategory(isActive ? null : cat)}
                    className={`cat-btn-glow flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all
                      ${isActive
                        ? 'border-[var(--primary)] bg-[var(--accent)] shadow-md'
                        : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40'
                      }`}
                  >
                    <span className="text-xl">{info.icon}</span>
                    <span className="text-xs font-semibold">{info.label}</span>
                    <span className="text-[0.625rem] text-[var(--muted-foreground)]">{askedCount}/{catQs.length}</span>
                  </button>
                );
              })}
            </div>

            {/* Expanded Questions Panel */}
            {expandedCategory && (
              <div className="animate-fade-in border border-[var(--primary)]/30 rounded-xl bg-[var(--card)] p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-3 text-sm">
                  <span className="text-lg">{CATEGORIES[expandedCategory].icon}</span>
                  <span className="font-semibold">{CATEGORIES[expandedCategory].label}</span>
                  <span className="text-[var(--muted-foreground)]">— {CATEGORIES[expandedCategory].description}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {QUESTIONS.filter(q => q.category === expandedCategory).map(q => {
                    const asked = questionsAsked.find(qa => qa.questionId === q.id);
                    const answer = asked?.answer;
                    const disabled = !!asked || questionsLeft <= 0;

                    return (
                      <button
                        key={q.id}
                        onClick={() => askQuestion(q.id)}
                        disabled={disabled}
                        className={`flex items-center gap-3 w-full p-3 rounded-lg border text-sm text-left transition-all
                          ${disabled ? 'cursor-not-allowed opacity-60' : 'hover:border-[var(--primary)]/40 hover:bg-[var(--accent)]'}
                          ${asked
                            ? answer
                              ? 'border-[var(--ring)] bg-[var(--accent)]'
                              : 'border-[var(--destructive)]/30 bg-[var(--destructive)]/5'
                            : 'border-[var(--border)] bg-[var(--card)]'
                          }`}
                      >
                        <span className="text-lg">{q.icon}</span>
                        <span className={`flex-1 ${asked ? 'line-through opacity-60' : ''}`}>{q.text}</span>
                        {asked && (
                          <span className="text-lg font-bold animate-pop-in">
                            {answer ? '✅' : '❌'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI Free Question Section */}
            <div className="mt-2 p-4 rounded-xl border-2 border-dashed border-[var(--ring)]/40 bg-[var(--accent)]/50">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span className="text-lg">🤖</span>
                Pregunta lo que quieras
                <span className="text-xs font-normal text-[var(--muted-foreground)]">(sin límite)</span>
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] mb-3">
                Escribe cualquier pregunta de sí/no en español sobre la palabra secreta.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={e => setAiQuestion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAIQuestion()}
                  placeholder="¿Es algo que usas en verano?"
                  disabled={aiLoading || completed || questionsLeft <= 0}
                  className="flex-1 text-sm px-3 py-2.5 rounded-lg border border-[var(--border)] bg-transparent text-[var(--foreground)] outline-none focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/15 transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleAIQuestion}
                  disabled={aiLoading || !aiQuestion.trim() || completed || questionsLeft <= 0}
                  className="px-4 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 whitespace-nowrap flex items-center gap-2"
                >
                  {aiLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin-loader" />
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      Preguntar
                    </>
                  )}
                </button>
              </div>
              {aiError && (
                <div className="mt-2 px-3 py-2 rounded-lg bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 animate-fade-in">
                  <p className="text-xs text-[var(--destructive)]">{aiError}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* QUESTION HISTORY */}
        {(questionsAsked.length > 0 || allQuestionsRef.current.length > 0) && (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Historial de preguntas
            </div>
            <div ref={historyRef} className="max-h-48 overflow-y-auto history-scroll flex flex-col gap-1.5">
              {[...allQuestionsRef.current, ...questionsAsked].map((q, i) => {
                const question = QUESTIONS.find(x => x.id === q.questionId);
                const text = question?.text || q.aiText || '?';
                const icon = question?.icon || '🤖';

                return (
                  <div
                    key={q.questionId}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm animate-slide-in
                      ${q.answer
                        ? 'bg-[var(--accent)] text-[var(--ring)]'
                        : 'bg-[var(--destructive)]/5 text-[var(--destructive)]'
                      }`}
                  >
                    <span className="font-mono text-xs text-[var(--muted-foreground)] w-5">{i + 1}.</span>
                    <span>{icon}</span>
                    <span className="flex-1 truncate">
                      {q.isAI && <span className="mr-1">🤖</span>}
                      {text}
                    </span>
                    <span className="font-bold whitespace-nowrap">{q.answer ? 'Sí' : 'No'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GUESS SECTION */}
        {!completed && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              ¿Ya sabes la respuesta?
            </h3>
            <div className="flex gap-2">
              <input
                ref={guessInputRef}
                type="text"
                value={guessInput}
                onChange={e => setGuessInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleGuess()}
                placeholder="Escribe tu respuesta en español..."
                autoComplete="off"
                className={`flex-1 text-base px-4 py-2.5 rounded-lg border outline-none transition-all
                  ${guessState === 'correct'
                    ? 'border-[var(--ring)] bg-[var(--accent)]'
                    : guessState === 'wrong'
                      ? 'border-[var(--destructive)] bg-[var(--destructive)]/5 animate-shake'
                      : 'border-[var(--border)] bg-transparent focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15'
                  }
                  text-[var(--foreground)]`}
              />
              <button
                onClick={handleGuess}
                disabled={completed || guessesLeft <= 0 || !guessInput.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 whitespace-nowrap"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
                Adivinar
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--muted-foreground)]">
                {guessesLeft} intento{guessesLeft !== 1 ? 's' : ''} restante{guessesLeft !== 1 ? 's' : ''}
              </span>
              <div className="flex gap-1">
                {guessAttempts.map((g, i) => (
                  <span key={i} className="text-xs bg-[var(--destructive)]/10 text-[var(--destructive)] border border-[var(--destructive)]/20 px-2 py-0.5 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RANDOM MODE BANNER */}
        {isRandomMode && !completed && (
          <div className="flex items-center justify-between p-3 rounded-xl border-2 border-dashed border-[var(--ring)]/40 bg-[var(--accent)]/30">
            <span className="text-sm text-[var(--muted-foreground)]">🎲 Modo aleatorio activo</span>
            <button
              onClick={backToDaily}
              className="text-xs font-semibold px-3 py-1 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
            >
              Volver al diario
            </button>
          </div>
        )}

        {completed && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold transition-opacity hover:opacity-90"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Compartir resultado
              </button>
              <button
                onClick={() => setShowResults(true)}
                className="px-5 py-3 rounded-lg border border-[var(--border)] bg-transparent text-[var(--foreground)] text-sm font-semibold transition-colors hover:bg-[var(--muted)]"
              >
                Ver resumen
              </button>
            </div>
            <p className="text-center text-xs text-[var(--muted-foreground)]">
              Vuelve mañana para un nuevo puzzle 🌅
            </p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] mt-auto" style={{ background: 'color-mix(in srgb, var(--card) 50%, transparent)' }}>
        <p className="max-w-[672px] mx-auto px-4 py-4 text-center text-xs text-[var(--muted-foreground)]">
          GISKA — Un juego diario de palabras en otros idiomas • <strong>35 preguntas • 90+ palabras • IA</strong>
        </p>
      </footer>

      {/* HELP MODAL */}
      {showHelp && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setShowHelp(false); }}
        >
          <div className="bg-[var(--card)] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-lg">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-3 right-3 text-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] leading-none p-1"
            >
              ×
            </button>
            <h2 className="text-center text-xl font-extrabold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              🌍 ¿Cómo jugar a GISKA?
            </h2>
            <p className="text-center text-sm text-[var(--muted-foreground)] mb-4">
              Adivina el significado de palabras en otros idiomas
            </p>
            <div className="flex flex-col gap-4">
              {[
                'Cada día aparece una palabra en otro idioma. Tu objetivo es adivinar su significado en español.',
                'Haz preguntas de Sí o No eligiendo de las categorías disponibles.',
                'Tienes un máximo de 20 preguntas y 5 intentos para adivinar.',
                '¡Nuevo! Escribe cualquier pregunta y una IA te responderá. ¡Sin límite!',
                'Puedes intentar adivinar en cualquier momento.',
                '¡Comparte tus resultados con tus amigos! 🎉 Cuantas menos preguntas, más estrellas.',
              ].map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="flex items-center justify-center w-8 h-8 min-w-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <div className="h-px bg-[var(--border)] my-4" />
            <div className="text-center">
              <p className="text-xs text-[var(--muted-foreground)] mb-2">Puntuación por estrellas</p>
              <div className="flex justify-center gap-6 text-sm">
                <div><span className="font-bold">⭐⭐⭐</span><br /><small className="text-[var(--muted-foreground)]">1-3 preguntas</small></div>
                <div><span className="font-bold">⭐⭐</span><br /><small className="text-[var(--muted-foreground)]">4-7 preguntas</small></div>
                <div><span className="font-bold">⭐</span><br /><small className="text-[var(--muted-foreground)]">8+ preguntas</small></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS MODAL */}
      {showResults && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setShowResults(false); }}
        >
          <div className="bg-[var(--card)] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-lg">
            <button
              onClick={() => setShowResults(false)}
              className="absolute top-3 right-3 text-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] leading-none p-1"
            >
              ×
            </button>
            <h2 className="text-center text-xl font-extrabold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {won ? '🎉 ¡Enhorabuena!' : '😔 ¡Casi!'}
            </h2>
            <p className="text-center text-sm text-[var(--muted-foreground)] mb-4">GISKA #{puzzleNumber}</p>

            <div className="bg-[var(--muted)] border-2 border-[var(--primary)]/20 rounded-xl p-4 text-center mb-4">
              <p className="text-sm text-[var(--muted-foreground)]">La palabra era</p>
              <p className="text-2xl font-black mt-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{dailyWord.word}</p>
              <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--primary)' }}>{dailyWord.meaning}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{dailyWord.flag} {dailyWord.language}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-[var(--muted)] rounded-lg p-3 text-center">
                <span className="text-2xl font-extrabold block">{totalQuestionsAsked}</span>
                <span className="text-xs text-[var(--muted-foreground)]">Preguntas{questionRound > 1 ? ' (' + questionRound + 'R)' : ''}</span>
              </div>
              <div className="bg-[var(--muted)] rounded-lg p-3 text-center">
                <span className="text-2xl font-extrabold block">{guessAttempts.length}</span>
                <span className="text-xs text-[var(--muted-foreground)]">Intentos</span>
              </div>
              <div className="bg-[var(--muted)] rounded-lg p-3 text-center">
                <span className="text-2xl font-extrabold block">{stars}</span>
                <span className="text-xs text-[var(--muted-foreground)]">Puntuación</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-wrap gap-1.5 justify-center mb-4">
              {[...allQuestionsRef.current, ...questionsAsked].map((q, i) => {
                const question = QUESTIONS.find(x => x.id === q.questionId);
                return (
                  <span
                    key={i}
                    title={question?.text || q.aiText || ''}
                    className={`text-xs px-2 py-0.5 rounded-full border
                      ${q.answer
                        ? 'border-[var(--ring)] text-[var(--ring)] bg-[var(--accent)]'
                        : 'border-[var(--destructive)] text-[var(--destructive)] bg-[var(--destructive)]/5'
                      }`}
                  >
                    {question?.icon || '🤖'} {q.answer ? '✅' : '❌'}
                  </span>
                );
              })}
            </div>

            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold transition-opacity hover:opacity-90 mb-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              Copiar resultado para compartir
            </button>

            <p className="text-center text-xs text-[var(--muted-foreground)]">
              ¡Vuelve mañana para un nuevo puzzle! 🌅
            </p>
          </div>
        </div>
      )}

      {/* GOD MODE MODAL */}
      {godMode && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setGodMode(false); }}
        >
          <div className="bg-[var(--card)] rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-lg border border-[var(--ring)]/30">
            <button
              onClick={() => setGodMode(false)}
              className="absolute top-3 right-3 text-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] leading-none p-1"
            >
              ×
            </button>

            <h2 className="text-center text-xl font-extrabold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              ⚡ Modo Dios
            </h2>
            <p className="text-center text-xs text-[var(--muted-foreground)] mb-4">Estadísticas y herramientas de administración</p>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 bg-[var(--muted)] rounded-lg p-1">
              {([['bank', '📊 Banco'], ['ai', '🤖 IA'], ['random', '🎲 Aleatorio']] as const).map(([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => setGodTab(tab)}
                  className={`flex-1 text-xs font-semibold py-2 px-3 rounded-md transition-all ${
                    godTab === tab
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* BANK TAB */}
            {godTab === 'bank' && (
              <div className="animate-fade-in">
                <h3 className="text-sm font-semibold mb-3">Preguntas del banco más usadas (todas las partidas)</h3>
                {Object.keys(godBankStats).length === 0 ? (
                  <p className="text-xs text-[var(--muted-foreground)] text-center py-6">
                    {godStatsLoading ? 'Cargando...' : 'No hay estadísticas aún. Juega algunas partidas primero.'}
                  </p>
                ) : (
                  <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto history-scroll">
                    {Object.entries(godBankStats)
                      .sort((a, b) => b[1] - a[1])
                      .map(([qId, count]) => {
                        const q = QUESTIONS.find(x => x.id === qId);
                        if (!q) return null;
                        const maxCount = Math.max(...Object.values(godBankStats));
                        const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
                        return (
                          <div key={qId} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--muted)]">
                            <span className="text-lg">{q.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs truncate">{q.text}</span>
                                <span className="text-xs font-bold ml-2 whitespace-nowrap">{count}x</span>
                              </div>
                              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-[var(--ring)] transition-all" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}

            {/* AI TAB */}
            {godTab === 'ai' && (
              <div className="animate-fade-in">
                <h3 className="text-sm font-semibold mb-3">Preguntas más hechas a la IA (simplificadas)</h3>
                {Object.keys(godAIStats).length === 0 ? (
                  <p className="text-xs text-[var(--muted-foreground)] text-center py-6">
                    {godStatsLoading ? 'Cargando...' : 'No hay preguntas a la IA registradas aún.'}
                  </p>
                ) : (
                  <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto history-scroll">
                    {Object.entries(godAIStats)
                      .sort((a, b) => b[1] - a[1])
                      .map(([text, count]) => {
                        const maxCount = Math.max(...Object.values(godAIStats));
                        const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
                        return (
                          <div key={text} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--muted)]">
                            <span className="text-lg">🤖</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs truncate">{text}</span>
                                <span className="text-xs font-bold ml-2 whitespace-nowrap">{count}x</span>
                              </div>
                              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-[var(--primary)] transition-all" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}

            {/* RANDOM TAB */}
            {godTab === 'random' && (
              <div className="animate-fade-in flex flex-col gap-4">
                <h3 className="text-sm font-semibold">Jugar con una palabra aleatoria</h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Selecciona una palabra al azar del banco completo ({WORDS.length} palabras disponibles).
                  Esto no afecta a la palabra diaria ni a tu racha.
                </p>
                <button
                  onClick={playRandomWord}
                  className="w-full py-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-bold transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                >
                  🎲 Jugar palabra aleatoria
                </button>
                {isRandomMode && (
                  <button
                    onClick={backToDaily}
                    className="w-full py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold transition-colors hover:bg-[var(--muted)] flex items-center justify-center gap-2"
                  >
                    📅 Volver al modo diario
                  </button>
                )}
                <div className="h-px bg-[var(--border)]" />
                <div className="text-center">
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Total de palabras en el banco: <strong className="text-[var(--foreground)]">{WORDS.length}</strong>
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    Total de preguntas del banco: <strong className="text-[var(--foreground)]">{QUESTIONS.length}</strong>
                  </p>
                </div>
              </div>
            )}

            <div className="h-px bg-[var(--border)] my-4" />
            <p className="text-center text-[0.625rem] text-[var(--muted-foreground)]">
              Acceso: Código Konami (↑↑↓↓←→←→BA)
            </p>
          </div>
        </div>
      )}

      {/* LIMIT MODAL */}
      {showLimitModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) return; }}
        >
          <div className="bg-[var(--card)] rounded-2xl p-6 max-w-sm w-full relative shadow-lg text-center">
            <div className="text-4xl mb-3">🤔</div>
            <h2 className="text-lg font-extrabold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Has usado tus {MAX_QUESTIONS} preguntas
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-5">
              {questionRound === 1
                ? 'Puedes pedir 20 preguntas más si crees que necesitas más pistas.'
                : 'Llevas ' + totalQuestionsAsked + ' preguntas en ' + questionRound + ' rondas. ¿Quieres seguir?'
              }
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleContinue}
                className="w-full py-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-bold transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
              >
                🔄 Continuar jugando
              </button>
              <button
                onClick={handleSeeAnswer}
                className="w-full py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold transition-colors hover:bg-[var(--muted)] flex items-center justify-center gap-2"
              >
                👁️ Ver la respuesta
              </button>
            </div>
            {questionRound > 1 && (
              <p className="text-xs text-[var(--muted-foreground)] mt-3">
                Total: {totalQuestionsAsked} preguntas
              </p>
            )}
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-lg text-sm font-semibold shadow-lg animate-[toastIn_0.3s_ease]"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
