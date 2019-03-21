package com.example.webdevsp19serverjava.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.webdevsp19serverjava.models.User;

@RestController
public class UserService {
	User alice = new User(123, "alice", "rabbit", "Alice", "Wonderland", "Faculty");
	User bob = new User(234, "bob", "marleypwd", "Bob", "Marley", "Faculty");
	User charles = new User(345, "charles", "two cities", "Charles", "Dickens", "Faculty");
	List<User> users = new ArrayList<User>(Arrays.asList(new User[] { alice, bob, charles }));

	@GetMapping("/api/user")
	public List<User> findAllUsers() {
		return users;
	}

	@GetMapping("/api/user/{userId}")
	public User findUserById(@PathVariable("userId") Integer id) {
		for (User user : users) {
			if (id.equals(user.getId()))
				return user;
		}
		return null;
	}

	@PostMapping(path = "/api/user")
	public User createUser(@RequestBody User user) {
		users.add(user);
		return user;
	}

	@DeleteMapping("/api/user/{userId}")
	public void deleteUser(@PathVariable("userId") Integer id) {
		Iterator<User> i = users.iterator();
		while (i.hasNext()) {
			User user = i.next();
			if (user.getId().equals(id)) {
				i.remove();
				break;
			}
		}
	}

	@PutMapping("/api/user/{userId}")
	public User updateUser(@PathVariable("userId") Integer id, @RequestBody User user) {
		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).getId().equals(id)) {
				users.set(i, user);
				return users.get(i);
			}
		}
		return null;
	}
}
