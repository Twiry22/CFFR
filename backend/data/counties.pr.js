/**
 * Kenya's 47 counties with a "job-hub tier" (Accessibility question):
 *   5 Nairobi · 4 major urban/commuter hubs · 3 regional towns with a real
 *   formal job market · 2 smaller markets · 1 remote/sparse markets
 * ⚠ Informed estimates — adjust as you learn more.
 */
const COUNTIES = [
  ["nairobi","Nairobi",5],
  ["mombasa","Mombasa",4],["kiambu","Kiambu",4],["nakuru","Nakuru",4],["kisumu","Kisumu",4],
  ["machakos","Machakos",4],["kajiado","Kajiado",4],["uasin-gishu","Uasin Gishu",4],
  ["nyeri","Nyeri",3],["meru","Meru",3],["kirinyaga","Kirinyaga",3],["muranga","Murang'a",3],
  ["embu","Embu",3],["kakamega","Kakamega",3],["kisii","Kisii",3],["bungoma","Bungoma",3],
  ["trans-nzoia","Trans Nzoia",3],["kilifi","Kilifi",3],["laikipia","Laikipia",3],["kericho","Kericho",3],
  ["nandi","Nandi",3],["kwale","Kwale",3],["narok","Narok",3],
  ["nyandarua","Nyandarua",2],["tharaka-nithi","Tharaka-Nithi",2],["kitui","Kitui",2],["makueni","Makueni",2],
  ["taita-taveta","Taita-Taveta",2],["lamu","Lamu",2],["bomet","Bomet",2],["baringo","Baringo",2],
  ["elgeyo-marakwet","Elgeyo-Marakwet",2],["vihiga","Vihiga",2],["busia","Busia",2],["siaya","Siaya",2],
  ["homa-bay","Homa Bay",2],["migori","Migori",2],["nyamira","Nyamira",2],["garissa","Garissa",2],
  ["turkana","Turkana",1],["west-pokot","West Pokot",1],["samburu","Samburu",1],["marsabit","Marsabit",1],
  ["isiolo","Isiolo",1],["mandera","Mandera",1],["wajir","Wajir",1],["tana-river","Tana River",1],
].map(([id, label, tier]) => ({ id, label, tier }));

module.exports = { COUNTIES };
