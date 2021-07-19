function getCurrentDate() {
  return new Date().toLocaleDateString().split(".").join("/");
}

const WELCOME = `
    :::       ::: :::::::::: :::        ::::::::   ::::::::    :::   :::   :::::::::: 
   :+:       :+: :+:        :+:       :+:    :+: :+:    :+:  :+:+: :+:+:  :+:         
  +:+       +:+ +:+        +:+       +:+        +:+    +:+ +:+ +:+:+ +:+ +:+          
 +#+  +:+  +#+ +#++:++#   +#+       +#+        +#+    +:+ +#+  +:+  +#+ +#++:++#      
+#+ +#+#+ +#+ +#+        +#+       +#+        +#+    +#+ +#+       +#+ +#+            
#+#+# #+#+#  #+#        #+#       #+#    #+# #+#    #+# #+#       #+# #+#             
###   ###   ########## ########## ########   ########  ###       ### ##########     
`;
export const MY_EMAIL = "prybegavictor@gmail.com";
export const MY_GITHUB = "https://github.com/Lunar-Pole/";

const INITIALIZE = `Main terminal OS v0.01 ${getCurrentDate()}`;
const MEM_CHECK = "MEM CHECK SUM";
const PERIPHERALS = "DETECTING PERIPHERALS";
const COPYRIGHT = "<(C)> Copyright Lunarsoft 2049";
const HELP = "Type [help] for a list of available commands";
const HELP_COMMANDS = `
Available commands:

help => This output
contact => Prints contact information
contact [key] => Opens up relevant contact link
clear => Clears the display
ls => Lists files
cd [dir] => Enters directory
cat [filename] => Lists file content
run [exe filename] => Runs application
`;
const CONTACT = `
Created by Prybega Victor

email => ${MY_EMAIL}
github => ${MY_GITHUB}

Use => contact [email | github] to (copy | open) the links.
`;

const PARTICLE_ONE =
  "You're in a desert, walking along in the sand, when all of a sudden you look down" +
  "and see a tortoise. It's crawling toward you. You reach down and you flip the tortoise over on its back. " +
  "The tortoise lays on its back, its belly baking in the hot sun, beating its legs trying to turn itself over, but it can't. " +
  "Not without your help. But you're not helping. Why is that?";
const REPLICANT =
  "Describe in single words only the good things that come into your mind about... your mother.";

export const MESSAGE = {
  INITIALIZE,
  MEM_CHECK,
  WELCOME,
  COPYRIGHT,
  PERIPHERALS,
  HELP,
  HELP_COMMANDS,
  CONTACT,
};

export const stringToCharsArray = (s) => s.split("");

export const pathTree = {
  documents: {
    type: "dir",
    name: "documents",
    files: [
      {
        type: "txt",
        name: "particle1",
        data: PARTICLE_ONE,
      },
      {
        type: "txt",
        name: "replicant",
        data: REPLICANT,
      },
      {
        type: "txt",
        name: "currentversion",
        data: "Version: 1.0.1",
      },
    ],
  },
  personal: {
    type: "dir",
    name: "personal",
    files: {
      datarecord: {
        type: "dir",
        name: "datarecord",
        files: [
          {
            type: "exe",
            name: "victor",
          },
        ],
      },
      websites: {
        type: "dir",
        name: "websites",
        files: [],
      },
      classified: {
        type: "dir",
        name: "classified",
        files: {},
      },
    },
  },
};
