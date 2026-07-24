import {
  useState,
  useEffect,
} from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface SenderSelectorProps {
  onSelect: (user: User | null) => void;
  value?: User | null;
}

export function SenderSelector({ onSelect, value }: SenderSelectorProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search.length >= 1) {
      setIsLoading(true);
      fetch(`http://localhost:3000/auth/users/search?search=${encodeURIComponent(search)}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setIsLoading(false);
        })
        .catch(() => {
          setUsers([]);
          setIsLoading(false);
        });
    } else {
      setUsers([]);
    }
  }, [search]);

  useEffect(() => {
    if (value) {
      setSearch(`${value.firstName} ${value.lastName}`);
    }
  }, [value]);

  const handleSelect = (user: User) => {
    onSelect(user);
    setSearch(`${user.firstName} ${user.lastName}`);
    setIsOpen(false);
  };

  const handleClear = () => {
    onSelect(null);
    setSearch('');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Отправитель"
          style={styles.input}
        />
        {value && (
          <button onClick={handleClear} style={styles.clearBtn}>
            ✕
          </button>
        )}
      </div>

      {isOpen && users.length > 0 && (
        <ul style={styles.dropdown}>
          {isLoading ? (
            <li style={styles.dropdownItem}>Загрузка...</li>
          ) : (
            users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelect(user)}
                style={styles.dropdownItem}
              >
                <div style={styles.userMain}>
                  {user.firstName} {user.lastName}
                </div>
                <div style={styles.userSub}>{user.username}</div>
              </li>
            ))
          )}
        </ul>
      )}

      {isOpen && search && users.length === 0 && !isLoading && (
        <div style={styles.dropdownEmpty}>Ничего не найдено</div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'relative',
    flex: 1,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #334155',
    borderRadius: 10,
    background: '#1e293b',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 10,
    outline: 'none',
    border: 'none',
    background: 'transparent',
    color: 'white',
  },
  clearBtn: {
    padding: '0 10px',
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 10,
    maxHeight: 240,
    overflowY: 'auto',
    zIndex: 50,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  dropdownItem: {
    padding: '10px 12px',
    cursor: 'pointer',
    borderBottom: '1px solid #334155',
  },
  userMain: {
    color: 'white',
    fontSize: 14,
  },
  userSub: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  dropdownEmpty: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 10,
    padding: '10px 12px',
    color: '#94a3b8',
    fontSize: 14,
    zIndex: 50,
  },
};