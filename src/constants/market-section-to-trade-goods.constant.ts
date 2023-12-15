import { TradeGoodsSymbols } from './trade-goods-symbols.enum';
import {MarketSection} from './market-section.enum';

export const MARKET_SECTION_TO_TRADE_GOODS: {
  [tradeGoodSymbol in MarketSection]: Set<TradeGoodsSymbols>;
} = {
  [MarketSection.COMPONENTS]: new Set([
    TradeGoodsSymbols.LIQUID_HYDROGEN,
    TradeGoodsSymbols.LIQUID_NITROGEN,
    TradeGoodsSymbols.ADVANCED_CIRCUITRY,
    TradeGoodsSymbols.IRON,
    TradeGoodsSymbols.MERITIUM,
    TradeGoodsSymbols.COPPER,
    TradeGoodsSymbols.ALUMINUM,
    TradeGoodsSymbols.SILVER,
    TradeGoodsSymbols.GOLD,
    TradeGoodsSymbols.PLATINUM,
    TradeGoodsSymbols.URANITE,
    TradeGoodsSymbols.HYDROCARBON,
    TradeGoodsSymbols.ANTIMATTER,
    TradeGoodsSymbols.FABRICS,
    TradeGoodsSymbols.ELECTRONICS,
    TradeGoodsSymbols.SHIP_PLATING,
    TradeGoodsSymbols.SHIP_PARTS,
    TradeGoodsSymbols.MICROPROCESSORS,
    TradeGoodsSymbols.PLASTICS,
    TradeGoodsSymbols.POLYNUCLEOTIDES,
    TradeGoodsSymbols.BIOCOMPOSITES,
    TradeGoodsSymbols.GRAVITON_EMITTERS,
    TradeGoodsSymbols.DIAMONDS,
    TradeGoodsSymbols.FUEL,
    TradeGoodsSymbols.HOLOGRAPHICS,
  ]),
  [MarketSection.RAW_MATERIALS]: new Set([
    TradeGoodsSymbols.QUARTZ_SAND,
    TradeGoodsSymbols.SILICON_CRYSTALS,
    TradeGoodsSymbols.AMMONIA_ICE,
    TradeGoodsSymbols.ICE_WATER,
    TradeGoodsSymbols.EXOTIC_MATTER,
    TradeGoodsSymbols.IRON_ORE,
    TradeGoodsSymbols.COPPER_ORE,
    TradeGoodsSymbols.ALUMINUM_ORE,
    TradeGoodsSymbols.SILVER_ORE,
    TradeGoodsSymbols.GOLD_ORE,
    TradeGoodsSymbols.PLATINUM_ORE,
    TradeGoodsSymbols.URANITE_ORE,
    TradeGoodsSymbols.MERITIUM_ORE,
  ]),
  [MarketSection.CIVILIAN_SUPPLIES]: new Set([
    TradeGoodsSymbols.FOOD,
    TradeGoodsSymbols.MEDICINE,
    TradeGoodsSymbols.DRUGS,
    TradeGoodsSymbols.CLOTHING,
    TradeGoodsSymbols.CYBER_IMPLANTS,
    TradeGoodsSymbols.GENE_THERAPEUTICS,
    TradeGoodsSymbols.NEURAL_CHIPS,
    TradeGoodsSymbols.MOOD_REGULATORS,
    TradeGoodsSymbols.VIRAL_AGENTS,
    TradeGoodsSymbols.PRECIOUS_STONES,
    TradeGoodsSymbols.JEWELRY,
  ]),
  [MarketSection.WEAPONRY]: new Set([
    TradeGoodsSymbols.FIREARMS,
    TradeGoodsSymbols.ASSAULT_RIFLES,
    TradeGoodsSymbols.MILITARY_EQUIPMENT,
    TradeGoodsSymbols.EXPLOSIVES,
    TradeGoodsSymbols.AMMUNITION,
    TradeGoodsSymbols.LASER_RIFLES,
  ]),
  [MarketSection.INDUSTRY_AND_SCIENCE]: new Set([
    TradeGoodsSymbols.FERTILIZERS,
    TradeGoodsSymbols.MACHINERY,
    TradeGoodsSymbols.LAB_INSTRUMENTS,
    TradeGoodsSymbols.EQUIPMENT,
    TradeGoodsSymbols.NANOBOTS,
    TradeGoodsSymbols.ROBOTIC_DRONES,
    TradeGoodsSymbols.AI_MAINFRAMES,
    TradeGoodsSymbols.QUANTUM_DRIVES,
    TradeGoodsSymbols.MICRO_FUSION_GENERATORS,
    TradeGoodsSymbols.SUPERGRAINS,
    TradeGoodsSymbols.SHIP_SALVAGE,
    TradeGoodsSymbols.RELIC_TECH,
    TradeGoodsSymbols.NOVEL_LIFEFORMS,
    TradeGoodsSymbols.BOTANICAL_SPECIMENS,
    TradeGoodsSymbols.CULTURAL_ARTIFACTS,
    TradeGoodsSymbols.FAB_MATS,
    TradeGoodsSymbols.QUANTUM_STABILIZERS,
  ]),
  [MarketSection.SHIP_MODULES]: new Set([
    TradeGoodsSymbols.REACTOR_SOLAR_I,
    TradeGoodsSymbols.REACTOR_FUSION_I,
    TradeGoodsSymbols.REACTOR_FISSION_I,
    TradeGoodsSymbols.REACTOR_CHEMICAL_I,
    TradeGoodsSymbols.REACTOR_ANTIMATTER_I,
    TradeGoodsSymbols.ENGINE_IMPULSE_DRIVE_I,
    TradeGoodsSymbols.ENGINE_ION_DRIVE_I,
    TradeGoodsSymbols.ENGINE_ION_DRIVE_II,
    TradeGoodsSymbols.ENGINE_HYPER_DRIVE_I,
    TradeGoodsSymbols.MODULE_MINERAL_PROCESSOR_I,
    TradeGoodsSymbols.MODULE_CARGO_HOLD_I,
    TradeGoodsSymbols.MODULE_CARGO_HOLD_II,
    TradeGoodsSymbols.MODULE_CARGO_HOLD_III,
    TradeGoodsSymbols.MODULE_CREW_QUARTERS_I,
    TradeGoodsSymbols.MODULE_ENVOY_QUARTERS_I,
    TradeGoodsSymbols.MODULE_PASSENGER_CABIN_I,
    TradeGoodsSymbols.MODULE_MICRO_REFINERY_I,
    TradeGoodsSymbols.MODULE_ORE_REFINERY_I,
    TradeGoodsSymbols.MODULE_FUEL_REFINERY_I,
    TradeGoodsSymbols.MODULE_SCIENCE_LAB_I,
    TradeGoodsSymbols.MODULE_JUMP_DRIVE_I,
    TradeGoodsSymbols.MODULE_JUMP_DRIVE_II,
    TradeGoodsSymbols.MODULE_JUMP_DRIVE_III,
    TradeGoodsSymbols.MODULE_WARP_DRIVE_I,
    TradeGoodsSymbols.MODULE_WARP_DRIVE_II,
    TradeGoodsSymbols.MODULE_WARP_DRIVE_III,
    TradeGoodsSymbols.MODULE_SHIELD_GENERATOR_I,
    TradeGoodsSymbols.MODULE_SHIELD_GENERATOR_II,
    TradeGoodsSymbols.MOUNT_GAS_SIPHON_I,
    TradeGoodsSymbols.MOUNT_GAS_SIPHON_II,
    TradeGoodsSymbols.MOUNT_GAS_SIPHON_III,
    TradeGoodsSymbols.MOUNT_SURVEYOR_I,
    TradeGoodsSymbols.MOUNT_SURVEYOR_II,
    TradeGoodsSymbols.MOUNT_SURVEYOR_III,
    TradeGoodsSymbols.MOUNT_SENSOR_ARRAY_I,
    TradeGoodsSymbols.MOUNT_SENSOR_ARRAY_II,
    TradeGoodsSymbols.MOUNT_SENSOR_ARRAY_III,
    TradeGoodsSymbols.MOUNT_MINING_LASER_I,
    TradeGoodsSymbols.MOUNT_MINING_LASER_II,
    TradeGoodsSymbols.MOUNT_MINING_LASER_III,
    TradeGoodsSymbols.MOUNT_LASER_CANNON_I,
    TradeGoodsSymbols.MOUNT_MISSILE_LAUNCHER_I,
    TradeGoodsSymbols.MOUNT_TURRET_I,
    TradeGoodsSymbols.MODULE_GAS_PROCESSOR_I,
  ]),
};