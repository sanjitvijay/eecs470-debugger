export default function decodeInst(inst) {
  // Check for the NOOP instruction.
  if (inst === 0x00000013) return "nop";

  const opcode = inst & 0x7F;
  const funct3 = (inst >> 12) & 0x7;
  const funct7 = inst >> 25;
  const funct12 = inst >> 20; // for system instructions

  switch (opcode) {
    case 0x37:
      return "lui";
    case 0x17:
      return "auipc";
    case 0x6f:
      return "jal";
    case 0x67:
      return "jalr";
    case 0x63:
      // Branch instructions
      switch (funct3) {
        case 0b000:
          return "beq";
        case 0b001:
          return "bne";
        case 0b100:
          return "blt";
        case 0b101:
          return "bge";
        case 0b110:
          return "bltu";
        case 0b111:
          return "bgeu";
        default:
          return "unknown";
      }
    case 0x03:
      // Load instructions
      switch (funct3) {
        case 0b000:
          return "lb";
        case 0b001:
          return "lh";
        case 0b010:
          return "lw";
        case 0b100:
          return "lbu";
        case 0b101:
          return "lhu";
        default:
          return "unknown";
      }
    case 0x23:
      // Store instructions
      switch (funct3) {
        case 0b000:
          return "sb";
        case 0b001:
          return "sh";
        case 0b010:
          return "sw";
        default:
          return "unknown";
      }
    case 0x13:
      // Immediate arithmetic instructions
      switch (funct3) {
        case 0b000:
          return "addi";
        case 0b010:
          return "slti";
        case 0b011:
          return "sltiu";
        case 0b100:
          return "xori";
        case 0b110:
          return "ori";
        case 0b111:
          return "andi";
        case 0b001:
          if (funct7 === 0x00) return "slli";
          return "unknown";
        case 0b101:
          if (funct7 === 0x00) return "srli";
          if (funct7 === 0x20) return "srai";
          return "unknown";
        default:
          return "unknown";
      }
    case 0x33:
      {
        // Register-register arithmetic
        const combo = (funct7 << 4) | funct3;
        switch (combo) {
          case 0x000:
            return "add";
          case 0x200:
            return "sub";
          case 0x001:
            return "sll";
          case 0x002:
            return "slt";
          case 0x003:
            return "sltu";
          case 0x004:
            return "xor";
          case 0x005:
            return "srl";
          case 0x205:
            return "sra";
          case 0x006:
            return "or";
          case 0x007:
            return "and";
          // M extension instructions
          case 0x010:
            return "mul";
          case 0x011:
            return "mulh";
          case 0x012:
            return "mulhsu";
          case 0x013:
            return "mulhu";
          case 0x014:
            return "div";
          case 0x015:
            return "divu";
          case 0x016:
            return "rem";
          case 0x017:
            return "remu";
          default:
            return "unknown";
        }
      }
    case 0x0f:
      return "fence";
    case 0x73:
      // System instructions
      switch (funct3) {
        case 0b000:
          switch (funct12) {
            case 0x000:
              return "ecall";
            case 0x001:
              return "ebreak";
            case 0x105:
              return "wfi";
            default:
              return "system";
          }
        case 0b001:
          return "csrrw";
        case 0b010:
          return "csrrs";
        case 0b011:
          return "csrrc";
        case 0b101:
          return "csrrwi";
        case 0b110:
          return "csrrsi";
        case 0b111:
          return "csrrci";
        default:
          return "unknown";
      }
    default:
      return "unknown";
  }
}