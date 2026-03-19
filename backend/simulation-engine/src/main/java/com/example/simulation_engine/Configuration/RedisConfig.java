package com.example.simulation_engine.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // KEY as plain string
        template.setKeySerializer(new StringRedisSerializer());
        
        // HASH KEY as plain string
        template.setHashKeySerializer(new StringRedisSerializer());
        
        // HASH VALUE as readable string
        template.setHashValueSerializer(new GenericToStringSerializer<>(Object.class));
        
        return template;
    }
}
