<template>
  <div class="chat-container">
    <div class="threads-list">
      <h2>Threads</h2>
      <ul class="threads">
        <li v-if="threads.length === 0" class="empty-state">
          No threads found. Start a new conversation.
        </li>
        <li v-for="thread in threads" :key="thread.id" @click="selectThread(thread.id)" class="thread-item"
          :class="{ active: threadId === thread.id }">
          <span>
            {{ thread.recipient.id == userId ? thread.user.nickname : thread.recipient.nickname }}
          </span>
        </li>
      </ul>
    </div>

    <div class="chat-area" v-if="threadId">
      <div class="messages-header">
        <h2>Messages</h2>
      </div>
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="message-item">
          <strong>{{ message.user.nickname }}:</strong> {{ message.message }}
        </div>
      </div>
      <div class="message-input">
        <textarea v-model="newMessage" placeholder="Type a message..." class="input-text"></textarea>
        <button @click="sendMessage" class="send-btn">Send</button>
      </div>
    </div>

    <div class="new-conversation">
      <h2>Start a New Conversation</h2>
      <input v-model="recipient" placeholder="Enter recipient nickname" class="input-recipient" />
      <button @click="createThread" class="create-thread-btn">Create Thread</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      threadId: null,
      newMessage: '',
      recipient: '',
      showNewThreadSection: false,
      userId: '',
    };
  },
  mounted() {
    this.userId = localStorage.getItem('userid');
  },
  computed: {
    ...mapState('chat', ['threads', 'messages']),
    ...mapState('auth', ['user']),
    currentUserId() {
      return 24;
    },
  },

  methods: {
    async selectThread(id) {
      this.threadId = id;
      await this.fetchMessages();
    },

    async fetchMessages() {
      await this.$store.dispatch('chat/fetchMessages', this.threadId);
    },

    async sendMessage() {
      if (!this.threadId) return;

      await this.$store.dispatch('chat/sendMessage', {
        threadId: this.threadId,
        message: this.newMessage,
      });
      this.newMessage = '';
      await this.fetchMessages();
    },

    async createThread() {
      if (!this.recipient) {
        alert("Please enter a recipient nickname.");
        return;
      }
      try {
        await this.$store.dispatch('chat/createThread', { recipient: this.recipient });
        this.recipient='';
        await this.fetchThreads();
      
      } catch (error) {
        alert("Failed to create thread. Make sure the recipient exists.");
        console.error(error);
      }
    },

    async fetchThreads() {
      await this.$store.dispatch('chat/fetchThreads');
    }
  },
  async created() {
    await this.$store.dispatch('chat/fetchThreads');
  }
};
</script>
<style scoped>
.chat-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  background-color: #f4f7fa;
  border-radius: 8px;
  max-width: 1200px;
  margin: auto;
}

.threads-list {
  width: 25%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.threads-list h2 {
  font-size: 1.5rem;
  margin-bottom: 16px;
}

.threads {
  list-style-type: none;
  padding: 0;
}

.thread-item {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.thread-item:hover {
  background-color: #e7f3ff;
}

.thread-item.active {
  background-color: #d1eaff;
  font-weight: bold;
}

.chat-area {
  width: 70%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.messages-header {
  margin-bottom: 16px;
}

.messages {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.message-item {
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: #f1f1f1;
  border-radius: 6px;
}

.message-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-text {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.send-btn {
  padding: 10px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.send-btn:hover {
  background-color: #45a049;
}

.new-conversation {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.new-conversation h2 {
  margin-bottom: 16px;
}

.input-recipient {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
}

.create-thread-btn {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.create-thread-btn:hover {
  background-color: #0069d9;
}

.empty-state {
  color: #999;
  padding: 12px;
}
</style>