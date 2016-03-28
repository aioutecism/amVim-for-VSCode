export class UtilMatch {

     public static mapToClosingChar =  {"'"  : "'",
                                        "\"" : "\"", 
                                        "<"  : ">",
                                        ">"  : ">",
                                        "("  : ")",
                                        ")"  : ")",
                                        "["  : "]",
                                        "]"  : "]",
                                        "{"  : "}", 
                                        "}"  : "}",
                                        };
                            
    public static mapToOpeningChar =   {"'"  : "'",
                                        "\"" : "\"", 
                                        ">"  : "<",
                                        "<"  : "<",
                                        ")"  : "(",
                                        "("  : "(",
                                        "]"  : "[",
                                        "["  : "[",
                                        "}"  : "{",
                                        "{"  : "{"
                                        };
}