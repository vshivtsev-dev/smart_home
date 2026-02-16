import {initData} from "@/utils/db/init/initData";
import {seedDatabase} from "@/utils/db/init/seedDatabase";

await seedDatabase(initData);
