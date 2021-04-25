package com.codenart.clientes.service;

import com.codenart.clientes.model.entity.Usuario;
import com.codenart.clientes.model.repository.UsuarioRepository;
import com.codenart.clientes.exceptions.UsuarioCadastradoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void salvar(Usuario usuario) {
        boolean existe = repository.existsByUsername(usuario.getUsername());

        if(existe)
            throw new UsuarioCadastradoException(usuario.getUsername());

        repository.save(usuario);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Nome de usuário não encontrado."));

        return User.builder()
                    .username(usuario.getUsername())
                    .password(usuario.getPassword())
                    .roles("USER").build();
    }
}
