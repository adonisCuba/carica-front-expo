export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      camioneros: {
        Row: {
          id: string
          usuario_id: string
        }
        Insert: {
          id?: string
          usuario_id: string
        }
        Update: {
          id?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "camioneros_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: true
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      camiones: {
        Row: {
          camionero_id: string
          capacidad: string
          conductor_nombre: string | null
          id: string
          modelo: string
          patente: string
          tipoequipo_id: string
        }
        Insert: {
          camionero_id: string
          capacidad: string
          conductor_nombre?: string | null
          id?: string
          modelo: string
          patente: string
          tipoequipo_id: string
        }
        Update: {
          camionero_id?: string
          capacidad?: string
          conductor_nombre?: string | null
          id?: string
          modelo?: string
          patente?: string
          tipoequipo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "camiones_camionero_id_fkey"
            columns: ["camionero_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "camiones_tipoequipo_id_fkey"
            columns: ["tipoequipo_id"]
            isOneToOne: false
            referencedRelation: "tipoequipo"
            referencedColumns: ["id"]
          },
        ]
      }
      cargas: {
        Row: {
          dador_id: string
          email: string | null
          fecha_creacion: string
          fechacarga: string
          fechadescarga: string
          formadepago_id: string
          id: string
          material_id: string
          otropagopor: string | null
          pagopor: string
          peso: string
          presentacion_id: string
          puntoreferencia: string | null
          telefonodador: string
          tipo_equipo: string | null
          ubicacionfinal_id: string
          ubicacioninicial_id: string
          valorviaje: string
        }
        Insert: {
          dador_id: string
          email?: string | null
          fecha_creacion?: string
          fechacarga: string
          fechadescarga: string
          formadepago_id: string
          id?: string
          material_id: string
          otropagopor?: string | null
          pagopor: string
          peso: string
          presentacion_id: string
          puntoreferencia?: string | null
          telefonodador: string
          tipo_equipo?: string | null
          ubicacionfinal_id: string
          ubicacioninicial_id: string
          valorviaje: string
        }
        Update: {
          dador_id?: string
          email?: string | null
          fecha_creacion?: string
          fechacarga?: string
          fechadescarga?: string
          formadepago_id?: string
          id?: string
          material_id?: string
          otropagopor?: string | null
          pagopor?: string
          peso?: string
          presentacion_id?: string
          puntoreferencia?: string | null
          telefonodador?: string
          tipo_equipo?: string | null
          ubicacionfinal_id?: string
          ubicacioninicial_id?: string
          valorviaje?: string
        }
        Relationships: [
          {
            foreignKeyName: "cargas_dador_id_fkey"
            columns: ["dador_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_formadepago_id_fkey"
            columns: ["formadepago_id"]
            isOneToOne: false
            referencedRelation: "formadepago"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_presentacion_id_fkey"
            columns: ["presentacion_id"]
            isOneToOne: false
            referencedRelation: "presentacion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_ubicacionfinal_id_fkey"
            columns: ["ubicacionfinal_id"]
            isOneToOne: false
            referencedRelation: "ubicaciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_ubicacioninicial_id_fkey"
            columns: ["ubicacioninicial_id"]
            isOneToOne: false
            referencedRelation: "ubicaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      ciudades: {
        Row: {
          id: number
          nombre: string
          provincia_id: number | null
        }
        Insert: {
          id?: number
          nombre: string
          provincia_id?: number | null
        }
        Update: {
          id?: number
          nombre?: string
          provincia_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ciudades_provincia_id_fkey"
            columns: ["provincia_id"]
            isOneToOne: false
            referencedRelation: "provincias"
            referencedColumns: ["id"]
          },
        ]
      }
      dadores: {
        Row: {
          id: string
          usuario_id: string
        }
        Insert: {
          id?: string
          usuario_id: string
        }
        Update: {
          id?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dadores_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: true
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      formadepago: {
        Row: {
          descripcion: string
          id: string
        }
        Insert: {
          descripcion: string
          id?: string
        }
        Update: {
          descripcion?: string
          id?: string
        }
        Relationships: []
      }
      material: {
        Row: {
          descripcion: string
          id: string
        }
        Insert: {
          descripcion: string
          id?: string
        }
        Update: {
          descripcion?: string
          id?: string
        }
        Relationships: []
      }
      presentacion: {
        Row: {
          descripcion: string
          id: string
        }
        Insert: {
          descripcion: string
          id?: string
        }
        Update: {
          descripcion?: string
          id?: string
        }
        Relationships: []
      }
      provincias: {
        Row: {
          id: number
          nombre: string
        }
        Insert: {
          id?: number
          nombre: string
        }
        Update: {
          id?: number
          nombre?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: number
          nombre: string
        }
        Insert: {
          id?: number
          nombre: string
        }
        Update: {
          id?: number
          nombre?: string
        }
        Relationships: []
      }
      tipoequipo: {
        Row: {
          descripcion: string
          id: string
        }
        Insert: {
          descripcion: string
          id?: string
        }
        Update: {
          descripcion?: string
          id?: string
        }
        Relationships: []
      }
      trigger_logs: {
        Row: {
          created_at: string | null
          id: number
          message: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          message: string
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string
        }
        Relationships: []
      }
      ubicaciones: {
        Row: {
          direccion: string
          id: string
          lat: number
          lng: number
        }
        Insert: {
          direccion: string
          id?: string
          lat: number
          lng: number
        }
        Update: {
          direccion?: string
          id?: string
          lat?: number
          lng?: number
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          apellido: string
          dni: string
          email: string
          id: string
          imgurl: string | null
          isSuscribed: boolean | null
          nombre: string
          rol_id: number | null
          telefono: string
        }
        Insert: {
          apellido: string
          dni: string
          email: string
          id?: string
          imgurl?: string | null
          isSuscribed?: boolean | null
          nombre: string
          rol_id?: number | null
          telefono: string
        }
        Update: {
          apellido?: string
          dni?: string
          email?: string
          id?: string
          imgurl?: string | null
          isSuscribed?: boolean | null
          nombre?: string
          rol_id?: number | null
          telefono?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_rol_id_fkey"
            columns: ["rol_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_cargas_completas: {
        Args: {
          is_driver: boolean
          user_id: string
        }
        Returns: {
          id: string
          dador: string
          telefono_dador: string
          formadepago: string
          presentacion: string
          material: string
          ubicacion_inicial: string
          ubicacion_final: string
          peso: number
          punto_referencia: string
          fecha_carga: string
          fecha_descarga: string
          valor_viaje: number
          pagopor: string
          otro_pagopor: string
        }[]
      }
      get_loads: {
        Args: {
          user_id: string
          is_driver: boolean
        }
        Returns: {
          id: string
          dador: string
          material: string
          peso: string
          presentacion: string
          ubicacion_inicial: string
          ubicacion_final: string
          fecha_carga: string
          fecha_descarga: string
          valor_viaje: string
          pago_por: string
          forma_de_pago: string
          otro_pago_por: string
          telefono_dador: string
          punto_referencia: string
        }[]
      }
      get_loads_by_province: {
        Args: {
          province_id: number
        }
        Returns: {
          carga_id: string
          dador_id: string
          peso: string
          ubicacioninicial_id: string
          ubicacionfinal_id: string
          telefonodador: string
          puntoreferencia: string
          material_id: string
          presentacion_id: string
          valorviaje: string
          pagopor: string
          otropagopor: string
          fechacarga: string
          fechadescarga: string
          formadepago_id: string
          email: string
          tipo_equipo: string
          fecha_creacion: string
        }[]
      }
      get_loads_by_radius: {
        Args: {
          lat_input: number
          lng_input: number
          radius_km: number
        }
        Returns: {
          carga_id: string
          material_id: string
          peso: string
          valorviaje: string
          ubicacioninicial_id: string
          direccion_inicial: string
        }[]
      }
      get_locations: {
        Args: {
          lat: number
          lon: number
          p_province?: string
          p_city?: string
          p_address?: string
          kms?: number
        }
        Returns: {
          id: string
          latitude: number
          longitude: number
          province: string
          city: string
          address: string
          distance_km: number
        }[]
      }
      test_insert_usuario: {
        Args: {
          p_nombre: string
          p_apellido: string
          p_dni: string
          p_email: string
          p_contraseña: string
          p_telefono: string
          p_rol_nombre: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
